import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { db } from "@/settings/firebase.setting";
import { query,where,getDocs,collection } from 'firebase/firestore';
import React from "react";
import Link from "next/link";
import { PartnersDisplay } from "@/components/PartnersDisplay";
import Layout from "@/components/layout";

// export async function getStaticPaths() {
//     const onSnapShot = await getDocs(collection(db,'partners'));
//     const paths = onSnapShot.docs.map(doc => {
//         return {
//             params:{
//                 pagePath:doc.data().pagePath,
//             }
//         }
//     });

//     return {
//         paths,
//         fallback:false
//     }
// }

// export async function getStaticProps({context}) {
//     // const slug = context.params.pagePath;

//     let partnerDoc = [];

// }

export default function PartnerInfo () {
    const router = useRouter();
    const [ partners,setPartners ] = React.useState([]);
    
    React.useEffect(() => {
        const getPartnerInfo = async () => {
            const q = query(collection(db,'partners'),where('pagePath','==',router.query.pagePath));
            const onSnapShot = await getDocs(q);
            
            setPartners(onSnapShot.docs.map((doc) => {
                return { id:doc.id, data: { ...doc.data() } }
            }))
        }
        getPartnerInfo();
    })


    return (
        <Layout>
            <>
                <Head>
                    <link rel="icon" href="/facepal_icon_logo.png" />
                    <meta name="description" content="The Coolest way to connect with friends and hold money" />
                    <meta name="keywords" content="facepal" />
                    <title>facepal Partners | {}</title>
                </Head>
                <main className="bg-violet-300/60">
                    <h1 className="font-bold text-xl shadow-md shadow-violet-950/50 text-center mx-2">Continue with this partner.</h1>
                    <p className="text-center text-md text-violet-950">you can change your partner later in the profile edit page</p>
                    <section className="flex justify-center items-center h-screen px-2">
                    {
                        partners.map(item => (
                                    
                            <PartnersDisplay 
                            key={item.id}
                            style={'flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:text-center'}
                            companyAddress={item.data.address}
                            compDesc={item.data.compDec}
                            companyName={item.data.companyName}
                            joinedAt={item.data.createdAt}
                            compEmail={item.data.email}
                            compLogo={item.data.imageUrl}
                            nextLink={item.data.pagePath }
                            compPhone={item.data.phone}
                            />

                        ))
                    }
                    </section>
                </main>
            </>
        </Layout>
    )
}