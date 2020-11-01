# My Personal Website

This is a repo for [my personal website](https://purema.xyz).

## Technologies used:

- Backend: **Firebase**
- Frontend: **Next.js with Typescript**

## Firebase setup

This project uses Firebase as its backend. Please copy `.env.example` from this repo to `.env` on your local machine, and configure the environment variables below according to your Firebase setup.

```
# Firebase client-side configuration

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_DB_URL=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MSG_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Firebase server-side configuration

FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=
```

## Available scripts

### `yarn run dev`

Launches development server with hot-reloading

### `yarn run build`

Builds the application for production

### `yarn run start`

Start Next.js server in production mode

### `yarn run type-check`

Type check your code without doing any compilation

## Deployment

This project is deployed on Vercel for easy configuration & management. But you can run this project on any server with Node.js installed.
