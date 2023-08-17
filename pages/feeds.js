
import Image from "next/image";
import Feed from "./account/profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

export default function NewFeed() {
    const {data:session} =useSession();
    const router = useRouter();

    React.useEffect(() => {
        if(!session) {
            router.push('/auth/signup')
        }
    }, []);

    return (
        <>
            <main className="flex flex-col justify-center items-center w-full">
                <div className="fixed bg-white p-1 top-0 left-0 right-0 shadow-lg flex justify-between mb-1">
                    <Image 
                    src={'/imgs/facepal_logo.png'} 
                    width={58} height={58}
                    ></Image>
                    <Image 
                    src={session?.user.image} 
                    width={30} height={30}
                    className="rounded-full"></Image>
                </div>
                <div className="mt-[60px] flex justify-between gap-3 border rounded-lg p-3">
                    <Image 
                    src={session?.user.image} 
                    width={30} height={30}
                    className="rounded-full"></Image>
                    <input 
                    placeholder="what's on your mind?"
                    className="border rounded-xl py-1 px-2"></input>
                    <></>
                </div>
                <div className="my-3 flex flex-col justify-between gap-3 border rounded-lg p-3">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center">
                            <div>
                                <Image src={session?.user.image} width={40} height={40}
                                className="rounded-full"></Image>
                            </div>
                            <div>
                                <h5>Thegreatsage</h5>
                                <small>2 hours ago</small>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <p>...</p>
                            <p>X</p>
                        </div>
                    </div>
                    <p>Where is the best place you have been?</p>
                    <p>Good Morning</p>
                    <div>
                        <div className="w-full">
                            <Image src={'/imgs/opeyemi.png'} width={58} height={58} className="w-full rounded-lg"></Image>
                        </div>
                        <div className="flex gap-3 flex-col">
                            <div className="flex justify-between px-1">
                                <p>364 comments</p>
                                <p>2.6k likes</p>
                                <p>3.5k views</p>
                            </div>
                            <hr></hr>
                            <input className="rounded-xl px-2 py-1 border border-gray-300"
                            placeholder="Write your comment here!"></input>
                            <div className="flex justify-between px-1">
                                <p>Like</p>
                                <p>Comment</p>
                                <p>Share</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}