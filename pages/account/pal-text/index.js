import Layout from "@/components/layout";
import RecievedMessageDisplay, { SentMessageDisplay } from "@/components/messageDisplay";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiSend } from "react-icons/bi";



export default function Messenger() {
    const [ palImages,setPalImages ] = React.useState([
        { id: 1, imgSrc: '/imgs/facepal_logo.png' },
        { id: 2, imgSrc: '/imgs/joy.webp' },
        { id: 3, imgSrc: '/imgs/opeyemi.png' },
        { id: 4, imgSrc: '/imgs/chima.webp' },
        { id: 5, imgSrc: '/imgs/joy.webp' },
        { id: 6, imgSrc: '/imgs/chima.webp' },
        { id: 7, imgSrc: '/imgs/opeyemi.png' },
    ])

    const [ message,setMessage ] = React.useState([
        { id: 1, sender: {
            id: 1, sender: 'facepal', recievedTime: '12:17pm', recievedmessage: "Welcome to Facepal, you will be able to use facepal to chat, post memories and share whatever you want with your pals (even money!). Thank you for using me!"
        },
        reciever: {
            id: 1, reciever: 'Zoe Fey', sentMessage: 'Hi, I am using facepal', sentTime: '1:02pm'
        },
        },
        { id: 2, sender: {
            id: 1, sender: 'facepal', recievedTime: '1:24pm', recievedmessage: "Welcome to Facepal, you will be able to use facepal to chat, post memories and share whatever you want with your pals (even money!). Thank you for using me!"
        },
        reciever: {
        },
        },
        { id: 3, sender: {
        },
        reciever: {
            id: 1, reciever: 'Zoe Fey', sentMessage: 'Can I send money with this app and talk to my pals as well?', sentTime: '1:39pm'
        },
        },
        { id: 4, sender: {
            id: 1, sender: 'facepal', recievedTime: '2:17pm', recievedmessage: "Yes Miss Fey, just ask your pals to start using this app and click on the bottom dollar Icon if you are on mobile. If you are on tablet or Pc, you will need to visit your profile page to begin sending funds. Thank you for using me!"
        },
        reciever: {
            
        },
        },
    ]);

    const [ formInput,setFormInput ] = React.useState('');

    const addMessage = () => {
        message.push(formInput)
    }

    return (
        <Layout>
            <Head>
                <link rel="shortcut icon" href="/facepal_icon_logo.ico" type="image/x-icon" />
                <title>facepal | Chat with pals</title>
                <meta name="description" content="facepal is the coolest social media platform to connect with friends and hold money" />
            </Head>
            <main>
                <section className="fixed overflow-hidden overflow-y-scroll no-scrollbar bg-violet-500/50 z-20 border-l-2 border-indigo-700 h-[80vh] sm:h-[80vh] p-1">
                    <ul className="flex flex-col p-2 gap-2 justify-center items-center overflow-y-scroll no-scrollbar ">
                        {
                            palImages.map((pals) => (
                                <li key={pals.id}>
                                    <Link href={"#"}>
                                        <Image 
                                        src={pals.imgSrc}
                                        alt="pal image"
                                        width={520}
                                        height={520}
                                        className="w-[35px] h-[35px] sm:w-[50px] sm:h-[50px] rounded-full border-2 border-indigo-800/50"
                                        />
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </section>

                <section className="fixed overflow-hidden overflow-y-scroll no-scrollbar bg-white z-20 h-[80vh] sm:h-[80vh] p-1 right-0 left-[55px] sm:left-[70px] p-2">
                    
                    <article className="text-violet-800/70 flex flex-col h-[73vh] overflow-hidden overflow-y-scroll no-scrollbar">
                        {
                            message.map((item) => (
                                <div key={item.id}>
                                    <SentMessageDisplay key={item.reciever.id}
                                    reciever={item.reciever.reciever}
                                    sentMessage={item.reciever.sentMessage}
                                    sentTime={item.reciever.sentTime}
                                    />
                                    <RecievedMessageDisplay key={item.sender.id}
                                    recievedMessage={item.sender.recievedmessage}
                                    recievedTime={item.sender.recievedTime}
                                    sender={item.sender.sender}
                                />
                                </div>
                            ))
                        }
                    </article>

                    <aside className="flex justify-center items-center">
                        <div className=" flex flex-row items-center justify-center gap-1 fixed bottom-[10vh] z-30 bg-white border-t border-violet-800/60 px-2">
                            <input 
                            placeholder="write your message..."
                            onChange={(text) => setFormInput(text.target.value)}
                            value={formInput}
                            className="w-[190px] sm:w-[480px] h-5px border-b-2 border-violet-800 shadow-inner placeholder:text-indigo-800 px-2 py-1 focus:outline-none"
                            />
                            
                            <BiSend onClick={addMessage} className="text-indigo-800 text-xl"/>
                        </div>
                    </aside>
                </section>
            </main>
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