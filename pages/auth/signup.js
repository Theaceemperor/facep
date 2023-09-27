import Head from "next/head";
import { useFormik } from "formik";
import * as yup from "yup";
import { signIn, useSession } from "next-auth/react";
import { authentication } from "@/settings/firebase.setting";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import MetaHeader from "@/utils/metahead";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

const vaidationRules = yup.object().shape({
    email:yup.string().required('this field is compulsory'),
    password:yup.string().required().min(8, 'minimum of 8 characters').max(36, 'maximum of 36 characters')
    .oneOf([yup.ref('passwordConfirmation'),null], "password dosen't match")
})

export default function Signup() {
    //active session info
    const {data:session} = useSession();
    console.log(session);
    const router = useRouter();

    if (session) {
        router.push('/feeds')
    }

    const handleGoogleEmailPasswordCreateAccount = async (userEmail, userPassword) => {
        createUserWithEmailAndPassword(authentication, userEmail, userPassword)
        .then((user) => {
            console.log(user)
        })
        .catch((error) => console.error(error))
    }

    const {handleBlur, handleSubmit, handleChange, errors, touched, values} = useFormik({
        initialValues: {email: '', password:'', passwordConfirmation: ''},
        onSubmit: values => {
            //create user account
            handleGoogleEmailPasswordCreateAccount(values.email, values.password)
        },
        validationSchema:vaidationRules
        });

    return (
        <>
        <Head>
            <link rel="shortcut icon" href="/facepal_icon_logo.ico" type="image/x-icon" />
            <title>facepal | Sign to facepal</title>
            <meta name="description" content="facepal is the coolest social media platform to connect with friends and hold money" />
        </Head>
        <main className="h-screen flex flex-row items-center justify-center">
        <div className="w-[480] sm:min-h-[480px] flex flex-col gap-5">
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <input
                    id="email" 
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                    placeholder="Email address"
                    className="py-3 sm:py-5 px-2 border border-indigo-400 rounded-lg bg-white/60"
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
                    className="py-3 sm:py-5 px-2 border border-indigo-400 rounded-lg bg-white/60"
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
                    className="py-3 sm:py-5 px-2 border border-indigo-400 rounded-lg bg-white/60"
                    />
                    <button type="submit" className="max-w-[160px] h-12 bg-indigo-800 rounded-lg text-white font-bold"
                    >Create Account</button>
                </form>
        
                <div className="w-full grid grid-cols-2 gap-3">
                    <button className="w-full h-12 bg-green-600 rounded-lg text-white font-bold" onClick={() => signIn("google")}>Google</button>
                    <button className="w-full h-12 bg-sky-600 rounded-lg text-white font-bold">Twitter</button>
                </div>
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
          destination:'/feeds',
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