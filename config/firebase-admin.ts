import firebaseAdmin from "firebase-admin";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
    credential: firebaseAdmin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY ? Buffer.from(process.env.FIREBASE_ADMIN_PRIVATE_KEY, "base64").toString() : "",
    }),
  });
}

export { firebaseAdmin };
