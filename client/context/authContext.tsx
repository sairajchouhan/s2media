import { createContext, useContext, useEffect, useState } from 'react'
import { axios } from '../config/axios'
import firebase from '../config/firebase'

const AuthContext = createContext<any>({})
export const useAuth = () => useContext(AuthContext)

const formatUser = (user: firebase.User, idToken: string): any => {
  return {
    ...user,
    idToken,
  }
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Record<any, any> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        console.log(user)
        user
          .getIdToken()
          .then(async (idToken) => {
            setUser(formatUser(user, idToken))
            try {
              const userRes = await axios.get('/user/me', {
                headers: {
                  Authorization: `Bearer ${idToken}`,
                },
              })
              const user = userRes.data
              setUser(formatUser(user, idToken))
              setLoading(false)
            } catch (err) {
              console.log(err)
              setLoading(false)
            }
          })
          .catch((err) => {
            console.log(err.message)
            setUser(null)
            setLoading(false)
          })
      }
    })
    return () => unsub()
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
