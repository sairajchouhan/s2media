import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import { axios } from '../config/axios'
import firebase from '../config/firebase'

const AuthContext = createContext<any>({})
export const useAuth = () => useContext(AuthContext)

const formatUser = (user: Record<any, any>, idToken: string): any => {
  return {
    ...user,
    idToken,
  }
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Record<any, any> | null>(null)
  const [loading, setLoading] = useState(true)
  const { push } = useRouter()

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
                data: { redirect, userFullDetials },
              } = userResp
              setUser(formatUser(userFullDetials, idToken))
              setLoading(false)
              push(redirect)
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
      }
    })
    return () => unsub()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = (email: string, password: string) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

  const signup = (email: string, password: string) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  const googleSignIn = () => {
    let provider = new firebase.auth.GoogleAuthProvider()
    return firebase.auth().signInWithPopup(provider)
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
    googleSignIn,
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