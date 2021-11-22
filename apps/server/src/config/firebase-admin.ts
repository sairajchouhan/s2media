import admin from 'firebase-admin'

export const initAdmin = () => {
  let serviceAccount: any
  if (process.env.NODE_ENV === 'production') {
    serviceAccount = require('../../admin.json')
  } else {
    serviceAccount = require('../../admin-dev.json')
  }

  if (admin.apps.length === 0) {
    console.log(`Initializing Firebase Admin SDK with "${serviceAccount.project_id}" service account`)
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as any),
    })
  }
}
