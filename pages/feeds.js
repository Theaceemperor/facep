import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import WritePost from '@/components/WritePost';
import { getDocs,collection, query, orderBy } from 'firebase/firestore';
import { db } from '@/settings/firebase.setting';
import PostDisplay from '@/components/PostDisplay';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import FeedsPostDisplay from '@/components/FeedsPostDisplay';

export default function Feeds() {
  const { data:session } = useSession();
  const [posts,setPosts] = React.useState([]);
  const router = useRouter();

  //get posts from firestore
  const getPosts = async () => {
    const q = query(collection(db,'myposts'),orderBy('postedAt','desc'))
    const res = await getDocs(q);

    setPosts(res.docs.map(doc => {
      return {
        id:doc.id,
        data:{
          ...doc.data()
        }
      }
    }))
  }
  getPosts();

  return (
    <Layout>
      <Head>
        <link rel="shortcut icon" href="/facepal_icon_logo.ico" type="image/x-icon" />
        <title>facepal | connect with friends</title>
        <meta name="description" content="facepal is the coolest social media platform to connect with friends and hold money" />
      </Head>
      <section className="flex flex-col justify-center bg-white overflow-y-scroll no-scrollbar">
        <div className="h-full w-full flex justify-center bg-white overflow-y-scroll no-scrollbar">
              {/* profile holder */}

          <div className="flex flex-col gap-2 p-3">
            <WritePost/>

            <div className="flex flex-col gap-2">
              {
                posts.map(post => (
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
        </div>
      </section>
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