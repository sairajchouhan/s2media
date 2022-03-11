import admin, { ServiceAccount } from 'firebase-admin'

export const initAdmin = () => {
  const serviceAccount: ServiceAccount = {
    clientEmail: process.env.FB_CLIENT_EMAIL,
    privateKey: process.env.FB_PRIVATE_KEY,
    projectId: process.env.FB_PROJECT_ID,
  }

  if (admin.apps.length === 0) {
    console.log(
      `Initializing Firebase Admin SDK with "${serviceAccount.projectId}" service account`
    )
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as any),
    })
  }
}
