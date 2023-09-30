import Image from "next/image";
import { NavSearch } from "./modals";
import { SearchBarAlone } from "./search";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";



export default function NavigationBar() {

    return (
        <>
            <main className="flex flex-row items-center justify-center gap-5">
                <div className="visible sm:invisible">
                    <NavSearch />
                </div>
                <section className="invisible sm:visible">
                    <SearchBarAlone />
                </section>
                <div>

                </div>
            </main>
        </>
    )
}

export function TopNavigationBar() {
    const { data:session } = useSession();

    return (
        <>
            <header className="invisible sm:visible fixed top-0 left-0 right-0 w-full flex flex-row justify-between bg-violet-500/50 p-3 shadow-md items-center h-[10vh]">
                <button className="border-transparent bg-transparent"
                onClick={() => signOut()}>
                    <Image 
                    width={500} 
                    height={580} 
                    className="w-[100px] sm:w-[200px]" 
                    src="/facepal_logo.png"
                    alt="profile photo" 
                    priority
                    />
                </button>

                <div className="invisible sm:visible"><SearchBarAlone /></div> 
                
                <Link href={'/account/profile'}
                className="w-[55px] h-[55px]">
                    <Image 
                    className="rounded-full w-[55px] h-[55px]" 
                    width={55} 
                    height={55} 
                    src={session?.user.image}
                    alt="profile photo" />
                </Link>
            </header>
            <header className="sm:invisible fixed top-0 left-0 right-0 w-full flex flex-row justify-between bg-violet-500/50 p-3 shadow-md items-center max-h-[10vh]">
                <Image 
                width={500} 
                height={580} 
                className="w-[100px] sm:w-[200px]" 
                src="/facepal_logo.png"
                alt="profile photo" 
                priority
                />

                <div className="sm:invisible visible"><NavSearch /></div>
                
                <Link href={'/account/profile'} className="w-[55px] h-[55px]">
                    <Image 
                    className="rounded-full w-[55px] h-[55px]" 
                    width={55} 
                    height={55} 
                    src={session?.user.image}
                    alt="profile photo" />
                </Link>
            </header>
        </>
    )
}