import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { db } from "@/settings/firebase.setting";
import { getDocs,collection,orderBy,query } from "firebase/firestore";
import React from "react";
import { PartnersDisplay } from "@/components/PartnersDisplay";
import Layout from "@/components/layout";
import { timeAgo } from "@/assets/time-ago";

// export async function getStaticProps() {





//     return {
//         props:{
//             data:partners,
//         }
//     }
// }

export default function Partners(params) {
    const [ partners,setPartners ] = React.useState([]);
    const handleGetPartners = async () => {
        const q = query(collection(db,'partners'),orderBy('createdAt','desc'));
        const onSnapShot = await getDocs(q);
        
        setPartners(
            onSnapShot.docs.map(document => {
                    return { id: document.id, data:document.data() }
                })
            )
    }
    handleGetPartners();

    return (
        <Layout>
            <>
                <Head>
                    <link rel="icon" href="/facepal_icon_logo.png" />
                    <meta name="description" content="The Coolest way to connect with friends and hold money" />
                    <meta name="keywords" content="facepal" />
                    <title>facepal | Become a Partner</title>
                </Head>
                <main>
                    <h1 className="text-2xl text-indigo-950/80 text-center py-2 font-bold">
                        Choose from our list of partners to access financial services.
                    </h1>

                    <section className="flex flex-col items-center justify-center sm:grid md:grid sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 sm:gap-4 sm:gap-6 my-5 px-2">
                        {
                        partners.map(item => (
                            
                            <PartnersDisplay 
                            key={item.id}
                            companyAddress={item.data.address}
                            compDesc={item.data.compDec}
                            companyName={item.data.companyName}
                            joinedAt={timeAgo(item.data.createdAt)}
                            compEmail={item.data.email}
                            compLogo={item.data.imageUrl}
                            nextLink={item.data.pagePath }
                            compPhone={item.data.phone}
                            />

                        ))
                        }
                    </section>
                    <Link href={'/partner-signup'}>
                        Become a partner
                    </Link>
                </main>
            </>
        </Layout>
    )
}