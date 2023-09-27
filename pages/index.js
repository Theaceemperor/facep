
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/router';
import MetaHeader from '@/utils/metahead';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <MetaHeader />
      <div className="h-screen w-full flex flex-col justify-around mobile-bg sm:tablet-bg lg:desktop-bg">
        <Image src="/imgs/bg-mobile.jpg" width={60} height={60} className="h-screen w-full hidden" alt="cover image"/>
        <article className='flex items-center justify-center'>
          <div className="w-400px sm:w-[800px] flex flex-col justify-center items-center gap-4 px-8 sm:px-10 lg:px-14">
              <div className="w-full  bg-indigo-300/20 py-6 sm:py-10 px-[40px] rounded-lg">
                  <h1 className="text-indigo-800 text-4xl sm:text-6xl font-mono font-bold">facepal</h1>
                  <h2 className="text-2xl sm:text-3xl mt-4">The Coolest way to connect with friends and hold money</h2>
              </div>
              <div className="w-full flex flex-col gap-5">
          
                  <div className="w-full grid grid-cols-2 gap-3">
                      <Link 
                      href={'/auth'}
                      className="w-full h-12 flex flex-row gap-4 px-2 justify-center items-center bg-violet-950 rounded-lg text-white font-bold"
                      >
                        Get started
                        <AiOutlineDoubleRight />
                      </Link>
                      <Link 
                      href={'#'}
                      className="w-full h-12 flex flex-row gap-4 px-2 justify-center items-center bg-violet-600 rounded-lg text-white font-bold">
                        Get Help
                        <BiHelpCircle />
                      </Link>
                  </div>
    
                  <p className="text-2xl text-white text-center">Want to become a facepal partner? <Link href="/partner-signup" className="underline">Become a partner</Link></p>
                  
              </div>
          </div>
        </article>
      </div>
    </>
  )
}
