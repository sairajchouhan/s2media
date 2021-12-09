import fbAdmin from 'firebase-admin'
import { initAdmin } from '../src/config/firebase-admin'
import { v4 as uuid } from 'uuid'
import { internet, lorem } from 'faker'
import { get4RandomChars } from '../src/utils/index'
import { PrismaClient } from '@prisma/client'
import Redis from 'ioredis'

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const prismaConnect = () => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: 'postgresql://postgres:password@localhost:5432/s2media?schema=public&connection_limit=10&pool_timeout=0',
      },
    },
  })
  return prisma
}

const addUsers = async () => {
  if (process.env.NODE_ENV === 'production') {
    console.log(' 🚨 🚨 🚨 Seeding in production, Nah! 🚨 🚨 🚨')
    return
  }

  initAdmin()
  const prisma = prismaConnect()

  const auth = fbAdmin.auth()
  const usersData = []
  const userPrismaData: Array<Promise<any>> = []

  for (let i = 1; i <= 50; i++) {
    const id = uuid()
    const email = internet.email()
    const name = internet.userName()
    usersData.push({
      uid: id,
      email: email,
      displayName: name,
    })
    const user = prisma.user.create({
      data: {
        uid: id,
        email: email,
        username: `${name}_${get4RandomChars()}`,
        avatar: null,
        provider: 'password',
        profile: {
          create: {
            bio: null,
            displayName: name,
          },
        },
      },
    })
    userPrismaData.push(user)
  }

  try {
    await auth.importUsers(usersData)
    await Promise.all(userPrismaData)
  } catch (err) {
    deleteUsersFromFirebase()
  }
}
addUsers

const deleteUsersFromFirebase = async () => {
  initAdmin()
  const users = await fbAdmin.auth().listUsers()
  const uids = users.users.map((user) => user.uid)
  await fbAdmin.auth().deleteUsers(uids)
}

const addPosts = async () => {
  if (process.env.NODE_ENV === 'production') {
    console.log(' 🚨 🚨 🚨 Seeding in production, Nah! 🚨 🚨 🚨')
    return
  }

  initAdmin()
  const prisma = prismaConnect()
  const users = await fbAdmin.auth().listUsers()
  const uids = users.users.map((user) => user.uid)

  const postsPromises: Array<Promise<any>> = []
  for (let i = 1; i <= 100; i++) {
    const randomUid = uids[getRandomIntInclusive(0, uids.length - 1)]
    const randomCaption = lorem.words(getRandomIntInclusive(5, 20))

    const post = prisma.post.create({
      data: {
        caption: randomCaption,
        userId: randomUid,
      },
    })
    postsPromises.push(post)
  }
  await Promise.all(postsPromises)
}
addPosts

/*
💻 NOTE TO FUTURE SELF:
=> This function is used to create key value paris in redis which looks like
'user:SAIRAJ2119' :'<all user details goes here in a string fromat>'
=> `SAIRAJ2119` here is the identifier and it is capital because the user search
api returns the matching users in capital letters
=> And these capital letters are used to look up the user details
=> This is the reason this functions exists
*/
const addUserDataToRedis = async () => {
  if (process.env.NODE_ENV === 'production') {
    console.log(' 🚨 🚨 🚨 Nah! 🚨 🚨 🚨')
    return
  }
  const prisma = prismaConnect()
  //! WARN: this redis instance will not work because the running instance of redis does not have
  //! port mapping in the docker compose file
  const redis = new Redis()
  const allUsers = await prisma.user.findMany({
    include: {
      profile: {
        select: {
          displayName: true,
        },
      },
    },
  })

  const allUsersPromises: Array<Promise<any>> = []
  allUsers.forEach((user) => {
    const prom = redis.set(`user:${user.username.toUpperCase()}`, JSON.stringify(user))
    allUsersPromises.push(prom)
  })
  await Promise.all(allUsersPromises)
}
addUserDataToRedis

// addUserDataToRedis()
//   .then(() => {
//     console.log('✅')
//   })
//   .catch((err) => {
//     console.log('❌', err)
//   })
