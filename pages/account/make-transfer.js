
import Link from 'next/link';
import React from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { PastTransaction } from '@/components/PastTransaction';
import Layout from '@/components/layout';
import { CgLogOut } from 'react-icons/cg';
import { signOut } from 'next-auth/react';
import { SiHomeassistant } from 'react-icons/si';
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import Head from 'next/head';

export default function MakeTransfer() {
    const [recentTransfers,setRecentTransfers ] = React.useState([
        { id: 1, recipient: 'Alex Cardi', email: 'alexbio@facepal.com', time: '2 hours ago', amount: '20300' },
        { id: 2, recipient: "Armani Georgio", email: 'argio@facepal.com', time: '5 hours ago', amount: '440000' },
        { id: 3, recipient: "Gregory", email: 'me@facepal.com', time: '7 hours ago', amount: '3500000' },
        { id: 4, recipient: 'Alex Cardi', email: 'alexbio@facepal.com', time: '11 hours ago', amount: '207000' },
        { id: 5, recipient: "Gregory", email: 'me@facepal.com', time: '18 hours ago', amount: '500000' },
        { id: 6, recipient: "Armani Georgio", email: 'argio@facepal.com', time: '22 hours ago', amount: '91000' }
    ])
    return (
        <Layout>
            <Head>
                <link rel="shortcut icon" href="/facepal_icon_logo.ico" type="image/x-icon" />
                <title>facepal | Make smooth and instant transfers on facepal</title>
                <meta name="description" content="facepal is the coolest social media platform to connect with friends and hold money" />
            </Head>
            <main className="px-4 sm:px-8 md:px-15">
            <div className='grid grid-cols-2 text-center my-5'>
                <button 
                onClick={() => signOut()}
                className="text-indigo-800  text-2xl font-mono font-bold flex justify-center items-center bg-transparent border-none">
                    <span className='flex items-center justify-center gap-1'>Signout<CgLogOut /></span>
                </button>
                
                <Link 
                href={'/feeds'}
                className="invisible sm:visible text-indigo-800  text-2xl font-mono justify-center font-bold flex items-center">
                    <span className='flex items-center justify-center gap-1'><SiHomeassistant /></span>
                </Link>
            </div>

            <section className='flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-6 mt-6'>
                <article className="bg-violet-500/50 p-4 rounded-xl h-[50vh]">
                    <h3 className="text-3xl text-indigo-800/80">Make Transfer</h3>
                    <p className="text-xl text-indigo-800/80">Balance: $0</p>

                    <form className='w-full flex flex-col gap-3 mt-4'>
                        <TextField 
                        id="outlined-basic" 
                        label="recipient email" 
                        variant="outlined" 
                        color='secondary'
                        />
                        <p><span className='text-sm text-black/80'>Recipient:</span> Jack Baur</p>

                        <TextField 
                        id="outlined-basic" 
                        label="amount" 
                        variant="outlined" 
                        color='secondary'
                        />

                        <Button
                        variant='contained'
                        style={{
                            background:'indigo',
                        }}
                        >Transfer</Button>
                    </form>
                </article>

                <aside className='border border-gray-200 p-4 rounded-xl'>
                    <h3 className="text-3xl text-gray-700">Recent Transfers</h3>

                    <ul className='h-[400px] flex flex-col gap-3 overflow-y-scroll no-scrollbar'>
                        {
                            recentTransfers.map((transfer) => (
                                <PastTransaction key={transfer.id}
                                amount={transfer.amount}
                                email={transfer.email}
                                recipient={transfer.recipient}
                                time={transfer.time}
                                />
                            ))
                        }

                        <Link href={"/account/transfer-history"}>
                            All transfer history
                        </Link>
                    </ul>
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
          destination:'/',
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