import dotenv from 'dotenv'

const envFile = process.env.NODE_ENV === 'production' ? './.env' : './.env.local'
console.log(`Loading environment variables from ${envFile.slice(2)}`)

dotenv.config({
  path: envFile,
})
