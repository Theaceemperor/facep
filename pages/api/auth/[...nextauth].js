
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { cert } from "firebase-admin/app";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { db } from "@/settings/firebase.setting";
import { collection,getDocs,query,where } from "firebase/firestore";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Facepal',
            id:'sign-in',
            credentials: {
                email: { label: 'email', type: 'email' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials, req) {
                const usersRef = query(collection(db,'myusers'),where("email",'==',credentials.email));
                const userSnapShot = await getDocs(usersRef);

                if (userSnapShot.empty) {
                    throw new Error('user not found');
                }

                const userData = userSnapShot.docs[0].data();

                if (credentials.password != userData.password) {
                    throw new Error('Email or password incorrect');
                }

                if (credentials.email != userData.email) {
                    throw new Error('Invalid Credentials')
                }

                return {
                    id:userData.id,
                    name:userData.name,
                    email:userData.email,
                    image:null,
                }
            }
        }),
    ],
    callbacks:{
        async session({session,user}) {
            //session.tok = '2345sedcfrvguche78';

            //Creates a new session prop called id
            // session.uid = user.id 

            return session;
        }
    },
    // adapter: FirestoreAdapter({
    //     credential: cert({
    //       projectId: process.env.FIREBASE_PROJECT_ID,
    //       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    //       privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n") : undefined,
    //     }),
    //   }),
}

export default NextAuth(authOptions);