import Head from "next/head";
import { useFormik } from "formik";
import * as yup from "yup";
import { signIn } from "next-auth/react";
import { authentication, db } from "@/settings/firebase.setting";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Link from "next/link";
import React from "react";
import AuthenticationIndicator from "@/utils/authentication-indicator";
import { addDoc, collection } from "firebase/firestore";

const validationRules = yup.object().shape({
    name:yup.string().required('Username is required'),
    email:yup.string().required('Email is required to proceed'),
    password:yup.string().required().min(8, 'minimum of 8 characters').max(36, 'maximum of 36 characters')
    .oneOf([yup.ref('passwordConfirmation'),null], "password dosen't match")
})

export default function Signup() {
    const router = useRouter();
    const [ showActivityIndicator,setShowActivityIndicator ] = React.useState(false);

    const handleGoogleEmailPasswordCreateAccount = async (userEmail, userPassword) => {
        createUserWithEmailAndPassword(authentication, userEmail, userPassword)
        .then((user) => {
            
        })
        .catch((error) => console.error(error))
    }

    const {handleBlur, handleSubmit, handleChange, errors, touched, values} = useFormik({
        initialValues: {name: '', email: '', password:'', passwordConfirmation: ''},
        onSubmit: values => {
            //create user account
            const handlePostUser = async () => {
                setShowActivityIndicator(true);
                const strToArray = values.name.split(' ');
                let slug = strToArray.join('-').toLowerCase();
        
                await addDoc(collection(db,'myusers'), {
                    name:values.name,
                    email:values.email,
                    password:values.password,
                    about:'Welcome to facepal, edit your about info on the pen icon...',
                    palTag:'@'+slug+'pal',
                    balance:0,
                    imageUrl:'/null',
                    joinedAt:new Date().getTime(),
                }).then(async () => {
                    await signIn("sign-up", { email:values.email,password:values.password }, {callbackUrl: "/feeds"})
                    setShowActivityIndicator(false);
                }).catch()
            }
            handlePostUser();
        },
        validationSchema:validationRules
    });
    

    return (
        showActivityIndicator
        ?
        <AuthenticationIndicator />
        :
        <>
            <Head>
                <link rel="shortcut icon" href="/facepal_icon_logo.ico" type="image/x-icon" />
                <title>facepal | Sign to facepal</title>
                <meta name="description" content="facepal is the coolest social media platform to connect with friends and hold money" />
            </Head>
            <main className="h-screen flex flex-row items-center justify-center bg-violet-400/50">
                <div className="sm:min-h-[480px] flex flex-col gap-3">
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                        <input
                        id="name" 
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur} 
                        placeholder="Username"
                        className="py-2 px-2 border border-indigo-400 rounded-lg bg-white/60"
                        />
                        {errors.name && touched.name
                        ? <span className="text-red-500">{errors.name}</span> : null}
                    
                        <input
                        id="email" 
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur} 
                        placeholder="Email address"
                        className="py-2 px-2 border border-indigo-400 rounded-lg bg-white/60"
                        />
                        {errors.email && touched.email
                        ? <span className="text-red-500">{errors.email}</span> : null}

                        <input 
                        id="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur} 
                        placeholder="Password"
                        className="py-2 px-2 border border-indigo-400 rounded-lg bg-white/60"
                        />

                        {errors.password && touched.password
                        ? <span className="text-red-500">{errors.password}</span> : null}
                        
                        <input
                        id="passwordConfirmation" 
                        type="password"
                        value={values.passwordConfirmation}
                        onChange={handleChange}
                        onBlur={handleBlur} 
                        placeholder="Confirm Password"
                        className="py-2 px-2 border border-indigo-400 rounded-lg bg-white/60"
                        />
                        <button type="submit" className="h-12 bg-violet-950/80 rounded-lg text-white font-bold"
                        >Create Account</button>
                    </form>
            
                    <div className="w-full grid grid-cols-2 gap-3">
                        <button className="w-full h-12 bg-green-600 rounded-lg text-white font-bold" onClick={() => signIn("google")}>Google</button>
                        <button className="w-full h-12 bg-sky-600 rounded-lg text-white font-bold">Twitter</button>
                    </div>
                    <p className="text-sm text-indigo-950/80 text-center">Do you own a facepal account? Login <Link href="/partner-signup" className="underline">here</Link></p>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req,context.res,authOptions);
    
    if(session) {
      return {
        redirect:{
          destination:'/account/profile',
          permanent:false,
        }
      }
    }
  
    return {
      props:{
        session:session
      }
    }
  }