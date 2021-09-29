import firebase from '../config/firebase'

export const providerNames = {
  google: 'google',
}
const providers = { [providerNames.google]: new firebase.auth.GoogleAuthProvider() }
export const getProvider = (provider: string) => {
  return providers[provider]
}
