# S2Media

S2Media which stands for Simple Social Media is a social media
site which is inspired from the best features of popular applications
like Facebook, Twitter, Instagram and Linkedin

## Why I made S2Media?

As a beginner to web devlopment, I was always facinated by
sites which had a lot of user interaction, like Amazon and Facebook,
but Facebook caught my eye with **real time notifications**

That was the instant I decided to build a simpler version of
these gaigantic social media sites. The **aim** has always been to
**learn** how web technologies work together when there is ton a
of user interaction and to implement as many features possible including **real time notifications**
(this was the main feature I wanted to have)

## Tech Stack

**Client**

- React
- NextJs
- Tailwind CSS
- React Query
- Socket.io

**Server**

- NodeJs
- Express
- Docker
- Nginx
- Prisma
- Redis
- Postgresql

**Services**

- Firebase (auth)
- Cloudinary
- Github Actions

## Features

- Authentication and authorization
  - Email and password
  - Google OAuth
- Posts with image uploads
  - Create posts
  - Delete posts
  - Read posts
- Like posts
- Bookmark posts
- Comment on posts
- Reply on comments
- Like comments and replies
- Real time Notifications
- Follow users
- Public and private user profiles
- Infinite scroll feed
- Autocomplete search for users

## Run Locally

There are some prerequisites to run the app successfully on your
local machine, follow the below steps to get started

### Prerequisites

- [Docker](docker.com/get-started) `20.10.10` or greater
- [Node](https://nodejs.org/en/) `14` or greater
- [yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable) `1.20.0` or greater (we are not using yarn 2)

Run the below commands in your terminal to confirm that all
the requirements are passed to run the project Locally

- `docker --version`
- `docker compose version`
- `node -v`
- `yarn -v`

All the above commands should execute successfully and output
the version numbers specified

### Project setup

Clone the project

```bash
  git clone https://github.com/sairajchouhan/s2media.git
```

Go to the project directory

```bash
  cd s2media
```

Install dependencies

```bash
  yarn boot
```

### Services setup

#### 1) Firebase

- Click [here](https://firebase.google.com/docs/web/setup#create-firebase-project-and-app)
  and complete `setp 1` to create a firebase project and register
  a web app
- Creating a **service account**, click [here](https://firebase.google.com/docs/admin/setup#initialize-sdk)
  and follow the setps to generate a private key file for your service account and rename it
  to `admin-dev.json`
- Copy `admin-dev.json` to `/apps/server/admin-dev.json`

#### 2) Cloudinary

Click [here](https://cloudinary.com/users/register/free) to signup for cloudinary,
after successfull signup you will
be redirected to the dashboard where on the top you can see your API
keys

### Enviornment Variables

#### 1) Client

- Create a file named `.env.local` in `/apps/client` folder
- Copy the contents of `.env.local.example` to `.env.local`
- Browse to your firebase project settings, by clicking on the
  gear or cog icon in the left sidebar
- In the _general_ setion of project settings, scroll down
  until you find `firebaseConfig` object with some project credentials
- Now fill your `.env.local` with the values from `firebaseConfig` object
  in your firebase project settings
- All enviornment Variables in `client` 👇
  - `NEXT_PUBLIC_FIREBASE_API_KEY=<fill_this>`
  - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<fill_this>`
  - `NEXT_PUBLIC_FIREBASE_PROJECT_ID=<fill_this>`
  - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<fill_this>`
  - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<fill_this>`
  - `NEXT_PUBLIC_FIREBASE_APP_ID=<fill_this>`

#### 2) Server

- Create a file `.env` in `apps/server` folder
- Copy the contents of `apps/server/.env.example` to `apps/server/.env`
- Navigate to your [Cloudinary console](https://cloudinary.com/console) and copy
  the values of _Cloud name_, _API Key_, and _API Secret_ from the
  top of the dashboard and paste them in the respective keys in
  `/apps/server/.env` file
- Do not modify `PORT` and `DATABASE_URL` enviornment variables
- All enviornment variables in `server` 👇
  - `CLOUDINARY_CLOUD_NAME=<fill_this>`
  - `CLOUDINARY_API_KEY=<fill_this>`
  - `CLOUDINARY_API_SECRET=<fill_this>`
  - `PORT=5000`
  - `DATABASE_URL=postgresql://postgres:password@db:5432/s2media?schema=public`

Now that all requirements are in place lets start our servers

- Run `yarn dev:client` to start client on port `3000`
- Run `yarn dev:up` to start our server (nginx) which listens for
  requests on port `5000`

🥳🎈 Hurray! you made it, go ahead to `localhost:3000` to see the
project in action

## License

[MIT](https://choosealicense.com/licenses/mit/)
