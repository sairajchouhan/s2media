/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { axios } from '../config/axios'
import firebase from '../config/firebase'
import { AuthUser } from '../types'
import { BaseUser } from '../types/user'
import { getProvider } from '../utils/oAuthProviders'
import { GET_PROFILE_USER } from '../utils/querykeysAndPaths'
import { useToast } from './toastContext'

type AuthContextType = {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<any>
  signup: (email: string, password: string) => Promise<any>
  logout: () => Promise<any>
  oAuthLogin: (provider: string) => Promise<any>
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

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user
          .getIdToken()
          .then(async (idToken) => {
            try {
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

  const login = (email: string, password: string) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

  const signup = (email: string, password: string) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  const oAuthLogin = (provider: string) => {
    return firebase.auth().signInWithPopup(getProvider(provider))
  }

  const logout = async () => {
    setUser(null)
    await firebase.auth().signOut()
  }

  const getIdToken = async () => {
    const idToken = await firebase.auth().currentUser?.getIdToken()
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
          <div className="text-indigo-600" style={{ fontSize: '6rem' }}>
            S2Media
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </AuthContext.Provider>
  )
}
