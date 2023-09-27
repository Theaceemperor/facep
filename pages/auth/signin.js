import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import MetaHeader from '@/utils/metahead';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi';
import AuthenticationIndicator from '@/utils/authentication-indicator';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';

const validationRules = yup.object().shape({
  email:yup.string().required('this field is rquired!'),
  password:yup.string().required()
})

export default function Home() {
  const [showActivityIndicator,setShowActivityIndicator] = React.useState(false);
  const router = useRouter();

  const {handleBlur, handleSubmit, handleChange, errors, touched, values} = useFormik({
    initialValues: { email: '', password:'' },
    onSubmit: values => {
      try {
        const handleUserSignin = async () => {
          setShowActivityIndicator(true);
          await signIn('sign-in', { email:values.email, password:values.password }, {callbackUrl: "/feeds"})
          .then(() => {
            setShowActivityIndicator(false);
          });
        }
        handleUserSignin();
      } catch (error) {
        
      }
    },
    validationSchema:validationRules
    });

  return (
    showActivityIndicator
    ?
    <AuthenticationIndicator />
    :
    <>
      <MetaHeader />
      <div className="h-screen w-full flex flex-col justify-around mobile-bg sm:tablet-bg lg:desktop-bg">
        <Image src="/imgs/bg-mobile.jpg" width={60} height={60} className="h-screen w-full hidden" alt="cover image"/>
        <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 px-8 sm:px-10 lg:px-24">
            <div className="w-full sm:min-h-[480px] bg-indigo-300/20 py-6 sm:py-10 px-[40px] rounded-lg">
                <Image 
                src={'/imgs/facepal_logo.png'}
                alt='logo'
                width={264}
                height={823}
                className='w-[300px] h-[60px] sm:h-[100px]'
                />
                <h2 className="text-2xl sm:text-3xl mt-4">The Coolest way to connect with friends and hold money</h2>
            </div>
            <div className="w-full  flex flex-col gap-5">
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <input 
                    id='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    type="email" 
                    placeholder="Email address"
                    className="py-3 sm:py-5 px-2 border border-indigo-400 rounded-lg bg-white/60"
                    />

                    {errors.email && touched.email
                    ? <span className="text-red-500">{errors.email}</span> : null}

                    <input 
                    id='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    type="password" 
                    placeholder="Password"
                    className="py-3 sm:py-5 px-2 border border-indigo-400 rounded-lg bg-white/60"
                    />

                    {errors.password && touched.password
                    ? <span className="text-red-500">{errors.password}</span> : null}

                    <div className="w-full grid grid-cols-2 gap-3">
                        <button 
                        type='submit'
                        onClick={handleSubmit}
                        className="w-full h-12 bg-indigo-800 rounded-lg text-white font-bold text-center"
                        >Log in to facepal</button>
                        <button 
                        onClick={() => signIn('google')}
                        className="w-full h-12 text-center flex flex-row gap-4 justify-center items-center bg-green-400/50 rounded-lg text-white font-bold"
                        >
                          Google login
                          <AiOutlineDoubleRight />
                        </button>
                    </div>
                </form>
                <div className="w-full grid grid-cols-2 gap-3">
                  <Link 
                  href={'#'}
                  className="w-full h-12 flex flex-row gap-4 text-center justify-center items-center bg-violet-950/80 rounded-lg text-white font-bold">
                    Get Help
                    <BiHelpCircle />
                  </Link>
                  <Link 
                  href={'/auth/signup'}
                  className="w-full h-12 text-center flex flex-row gap-4 justify-center items-center bg-violet-950/80 rounded-lg text-white font-bold"
                  >
                  Create account
                    <AiOutlineDoubleRight />
                  </Link>
                </div>
  
                <p className="text-lg text-white text-center">Want to become a facepal partner? <Link href="/partner-signup" className="underline">Become a partner</Link></p>
                
            </div>
        </div>
      </div>
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
