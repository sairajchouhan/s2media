import admin from 'firebase-admin'
import serviceAccount from '../../admin.json'

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
  })
}
