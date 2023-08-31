
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { cert } from "firebase-admin/app";
import { FirestoreAdapter } from "@auth/firebase-adapter"


export const authOptions = {
    providers: [
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks:{
        async session({session,user}) {
            //session.tok = '2345sedcfrvguche78';

            return session;
        }
    },
    adapter: FirestoreAdapter({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n") : undefined,
        }),
      }),
}

export default NextAuth(authOptions);