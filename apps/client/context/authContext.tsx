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
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)
export const useAuth = () => useContext(AuthContext)

const fromPaths = ['/login', '/signup']

const formatUser = (user: BaseUser, idToken: string): AuthUser => {
  return {
    ...user,
    idToken,
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
              // nookies.set(undefined, 'idk', idToken, { path: '/' })
              const {
                data: { userFullDetials },
              } = userResp
              setUser(formatUser(userFullDetials, idToken))
              if (fromPaths.includes(router.pathname)) {
                router.push('/home')
              }
            } catch (err) {
              console.log(err)
              setUser(null)
              setLoading(false)
            }
          })
          .catch((err) => {
            console.log(err.message)
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

  const { data } = useQuery(
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
