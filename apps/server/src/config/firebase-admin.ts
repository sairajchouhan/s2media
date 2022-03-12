import { initializeApp, cert } from 'firebase-admin/app'
import type { ServiceAccount } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

const serviceAccount: ServiceAccount = {
  clientEmail: process.env.FB_CLIENT_EMAIL,
  privateKey:
    process.env.NODE_ENV === 'production'
      ? Buffer.from(process.env.FB_PRIVATE_KEY!, 'base64').toString()
      : process.env.FB_PRIVATE_KEY,
  projectId: process.env.FB_PROJECT_ID,
}

console.log(`Initializing Firebase Admin SDK with "${serviceAccount.projectId}" service account`)

const app = initializeApp({
  credential: cert(serviceAccount as any),
})

export const auth = getAuth(app)
