/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { axios } from '../config/axios'
import { AuthUser } from '../types'
import { BaseUser } from '../types/user'
import { googleOAuthProvider } from '../utils/oAuthProviders'
import { GET_PROFILE_USER } from '../utils/querykeysAndPaths'
import { useToast } from './toastContext'
import { auth } from '../config/firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  connectAuthEmulator,
  onAuthStateChanged,
} from 'firebase/auth'
import type { UserCredential } from 'firebase/auth'

type AuthContextType = {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<UserCredential>
  signup: (email: string, password: string) => Promise<UserCredential>
  logout: () => Promise<any>
  oAuthLogin: () => Promise<UserCredential>
  getIdToken: () => Promise<string | undefined>
  rqUser: any
  refetchRqUser: any
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)
export const useAuth = () => useContext(AuthContext)

const formatUser = (user: BaseUser, idToken: string, isNewSignup: boolean): AuthUser => {
  return {
    ...user,
    idToken,
    isNewSignup,
  }
}

if (process.env.NODE_ENV === 'test') {
  connectAuthEmulator(auth, 'http://localhost:9099')
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        user
          .getIdToken()
          .then(async (idToken) => {
            try {
              await new Promise((res) => setTimeout(res, 2000))
              const userResp = await axios.get('/user/me', {
                headers: {
                  Authorization: `Bearer ${idToken}`,
                },
              })
              const {
                data: { userFullDetials, isNewSignup },
              } = userResp
              setUser(formatUser(userFullDetials, idToken, isNewSignup))
            } catch (err) {
              console.error(err)
              setUser(null)
              setLoading(false)
            }
          })
          .catch((err) => {
            console.error(err.message)
            setUser(null)
            setLoading(false)
          })
      } else {
        setLoading(false)
        setUser(null)
      }
    })
    return () => unsub()
  }, [router])

  const { data, refetch } = useQuery(
    GET_PROFILE_USER.queryKey(user?.username as string),
    async () => {
      const { data } = await axios.get(GET_PROFILE_USER.path(user?.username as string), {
        headers: {
          Authorization: `Bearer ${user?.idToken}`,
        },
      })
      return data
    },
    {
      enabled: !!user,
      onSuccess: () => {
        setLoading(false)
        if (user?.isNewSignup) {
          router.push('/home')
        } else if (router.pathname === '/login') {
          router.push('/home')
        } else {
        }
      },
      onError: () => {
        toast({ message: 'Somethig went wrong', type: 'error' })
        setLoading(false)
      },
    }
  )

  const login = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signup = (email: string, password: string): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const oAuthLogin = (): Promise<UserCredential> => {
    return signInWithPopup(auth, googleOAuthProvider)
  }

  const logout = async () => {
    setUser(null)
    await auth.signOut()
  }

  const getIdToken = async () => {
    const idToken = await auth.currentUser?.getIdToken()
    return idToken
  }

  const returnObj = {
    user,
    login,
    signup,
    logout,
    oAuthLogin,
    getIdToken,
    rqUser: data?.user,
    refetchRqUser: refetch,
    loading,
  }

  return (
    <AuthContext.Provider value={returnObj}>
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen bg-gray-100">
          <div className="flex flex-col items-center">
            <div className="text-indigo-600" style={{ fontSize: '6rem' }}>
              S2Media
            </div>
            <p className="text-xl text-slate-700">
              <span className="text-indigo-600 font-medium">Fun fact</span> free tiers are slow,
              Loading...
            </p>
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </AuthContext.Provider>
  )
}
