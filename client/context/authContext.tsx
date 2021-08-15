/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import { axios } from '../config/axios'
import firebase from '../config/firebase'
import { AuthUser } from '../types'
import { BaseUser } from '../types/user'
import { getProvider } from '../utils/oAuthProviders'

type AuthContextType = {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<any>
  signup: (email: string, password: string) => Promise<any>
  logout: () => Promise<any>
  oAuthLogin: (provider: string) => Promise<any>
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
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  console.log(user)

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
                data: { userFullDetials },
              } = userResp
              setUser(formatUser(userFullDetials, idToken))
              setLoading(false)
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

  const returnObj = {
    user,
    login,
    signup,
    logout,
    oAuthLogin,
  }

  return (
    <AuthContext.Provider value={returnObj}>
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen bg-gray-100">
          <h1 className="text-indigo-600 text-8xl">S2Media</h1>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}
