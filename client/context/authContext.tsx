import { createContext, useContext, useEffect, useState } from 'react'
import firebase from '../config/firebase'

const AuthContext = createContext<any>({})
export const useAuth = () => useContext(AuthContext)

type FormatedUser = {
  uid: string
  email: string
  displayName: string
  avatar: string
  idToken: string
}

const formatUser = (user: firebase.User, idToken: string): FormatedUser => {
  return {
    uid: user.uid as string,
    email: user.email as string,
    displayName: user.displayName as string,
    avatar: user.photoURL as string,
    idToken,
  }
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FormatedUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        console.log(user)
        user.getIdToken().then((idToken) => {
          setUser(formatUser(user, idToken))
        })
      }
      setLoading(false)
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
