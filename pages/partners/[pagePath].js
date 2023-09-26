
import React from "react";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { db } from "@/settings/firebase.setting";
import { query,getDocs,where,collection } from "firebase/firestore";

export async function getStaticPaths() {
    const onSnapShot = await getDocs(collection(db,'partners'));
    const paths = onSnapShot.docs.map(doc => {
        return {
            params:{
                pagePath:doc.data().pagePath
            }
        }
    });

    return {
        paths,
        fallback:false
    }
}

export async function getStaticProps() {
    const partners = ['hello'];

    return {
        props:{
            allPartners:partners
        }
    }
}

export default function PartnerInfo({allPartners}) {
    const router = useRouter();

    let partnerDoc = [];
    const [partnerSpur,getPartnerSpur] = React.useState([]);

    const getPartnerInfo = async () => {
        const q = query(collection(db,'partners'),where('pagePath','==',router.query.pagePath));
        const onSnapShot = await getDocs(q);
        getPartnerSpur(onSnapShot.docs.map(doc => {
            let doc_ = {
                data:doc.data(),
                id:doc.id
            }

            partnerDoc.push(doc_)
        })
        )
    }
    getPartnerInfo()

    return (
        <>
            <Head>
                <link rel="icon" href="/facepal_icon_logo.png" />
                <meta name="description" content="The Coolest way to connect with friends and hold money" />
                <meta name="keywords" content="facepal" />
                <title>facepal Partners | {partnerSpur.map(doc => {doc.data.pagePath})}</title>
            </Head>
            <main className="px-4 py-6 sm:px-16 sm:py-16 md:px-24 md:py-20">

            </main>
        </>
    )
}