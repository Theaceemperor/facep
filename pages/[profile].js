import Image from 'next/image';
import {GoSignOut} from 'react-icons/go';
import { useSession, signOut } from 'next-auth/react';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { db } from '@/settings/firebase.setting';
import { collection,query,where,getDocs, orderBy } from 'firebase/firestore';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import Head from 'next/head';
import Layout from '@/components/layout';
import { SiHomeassistant } from 'react-icons/si';
import { MdUnsubscribe } from 'react-icons/md';
import { timeAgo } from '@/assets/time-ago';
import FeedsPostDisplay from '@/components/FeedsPostDisplay';
import { HiBadgeCheck } from 'react-icons/hi';
import { LuPalmtree } from 'react-icons/lu';


export default function Feed() {
    const {data:session} = useSession();
    const router = useRouter();

    const [userPosts, setUserPosts] = React.useState([]);
    const [userData, setUserData] = React.useState([]);

    const handleGetUserPosts = async () => {
        try {
            const q = query(
                collection(db,'myposts'),
                where('author','==',router.query.profile),
                orderBy('postedAt', 'desc')
                );
            const onSnapShot = await getDocs(q);
            setUserPosts(onSnapShot.docs.map(doc => {
                return {
                    id:doc.id,
                    data:{
                        ...doc.data()
                    }
                }
            }));            
        } catch (error) {

        }
    }
    handleGetUserPosts();

    const userPostRef = userPosts.map(item => {
        return item.data.user
    });
    const userRefToString = userPostRef[0]

    const handleGetUserData = async () => {

        const u = query(collection(db,'myusers'),where('email','==',userRefToString));
        const userSnapShot = await getDocs(u);

        setUserData(userSnapShot.docs.map(doc => {
            return {
                id:doc.id,
                data:{
                    ...doc.data()
                }
            }
        }))
    }; handleGetUserData();
    return (
       <Layout>
             <>
                <Head>
                    <link rel="shortcut icon" href="/facepal_icon_logo.ico" type="image/x-icon" />
                    <title>facepal | Profile</title>
                    <meta name="description" content="facepal is the coolest social media platform to connect with friends and hold money" />
                </Head>
                <main className="flex justify-center">
                    <div className="w-full h-full bg-white overflow-y-scroll no-scrollbar">
                    
                        {/* Profile holder */}

                        <header className="bg-violet-300/50 border-b-2 border-indigo-800/50 p-3">
                                    {
                                        userData.map(dataItem => (
                            <div className="flex flex-col gap-1 items-center">
                                <div className="bg-gradient-to-b from-indigo-500 via-sky-500 to-pink-500 p-1 rounded-full">
                                    <Image 
                                    className="rounded-full w-[60px] h-[60px]" width={58} height= {58} 
                                    src={dataItem.data.imageUrl} alt="profile photo" />
                                </div>
                                <small key={dataItem.id} >{dataItem.data.palTag}</small>
                                <p className="text-gray-700 font-bold">{dataItem.data.name}</p>
                            </div>
                                    ))
                                }
                            <div className=' text-indigo-900/80 '>
                                {
                                    userData.map(dataItem => (
                                        <p className="text-sm mt-1 text-center" key={dataItem.id}>{dataItem.data.about}</p>
                                    ))
                                }
                                
                                <div className='flex justify-between items-center'>
                                    <ul className="flex flex-row justify-between p-2 w-full bg-violet-500/50 max-h-[5vh] items-center gap-1 text-violet-950/80 rounded-lg text-center">
                                        <li>
                                            <Link href={"/feeds"}>
                                                <GoSignOut
                                                className="text-xl font-bold"
                                                onClick={() => signOut()} 
                                                />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={"/feeds"}>
                                                <SiHomeassistant className="text-xl font-bold"/>
                                            </Link>
                                        </li>
                                        <li>
                                            <HiBadgeCheck className="text-xl font-bold"/>
                                        </li>
                                        <li className="">
                                            <LuPalmtree className="text-xl font-bold"/>
                                        </li>
                                        <li><Link href={"/account/pal-text"}><MdUnsubscribe className="text-xl"/></Link></li>
                                        <li className="text-md font-bold flex items-center justify-center"><Link href={"/partners"}><small className='bold'>Partner info</small></Link></li>
                                    </ul>
                                </div>
                                {
                                    userData.map(item => (
                                        <ul className="flex flex-row justify-between mt-1" key={item.id}>
                                            <li className="text-sm text-gray-700">Location: {item.data.location}</li>
                                            <li className="text-sm text-gray-700">pal since: {timeAgo(item.data.joinedAt)}</li>
                                        </ul>
                                    ))
                                }
                            </div>
                        </header>

                        {/* previous posts holder */}
                        <section className="flex flex-col justify-center bg-white overflow-y-scroll no-scrollbar">
                            <div className="h-full w-full flex justify-center bg-white overflow-y-scroll no-scrollbar">

                                <div className="flex flex-col gap-2">
                                {
                                    userPosts.map(post => (
                                    <FeedsPostDisplay key={post.id}
                                    postID={post.id}
                                    timePosted={post.data.postedAt}
                                    body={post.data.body}
                                    postImage={post.data.imageUrl}
                                    name={post.data.author}
                                    imgSrc={post.data.userImg}
                                    postLikes={post.data.likes}
                                    />
                                    ))
                                }
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </>
       </Layout>
    )
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req,context.res,authOptions);
    
    if(!session) {
      return {
        redirect:{
          destination:'/auth',
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