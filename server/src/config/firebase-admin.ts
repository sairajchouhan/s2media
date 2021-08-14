import admin from 'firebase-admin'
import serviceAccount from '../../admin.json'

export const initAdmin = () => {
  if (admin.apps.length === 0) {
    console.log(`Initializing Firebase Admin SDK with service account`)
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as any),
    })
  }
}
