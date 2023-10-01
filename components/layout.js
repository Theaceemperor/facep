import { AdsNotification, OnLoginNotification } from "@/assets/notification";
import Footer from "./footer";
import { TopNavigationBar } from "./nav";
import { useSession } from "next-auth/react";



export default function Layout({children}) {
    const { data:session }= useSession();

    return (
        <>
            <div className='h-[10vh]'>
                <TopNavigationBar />
            </div>
            <blockquote className="fixed z-30 top-[50vh] bottom-[50vh] right-0">
                <AdsNotification 
                alertTitle={"Get a Website 30% off"}
                >
                    <small>Did you know with spades you can get a website built almost free?
                        We offer premium professional web development services and management</small> 
                </AdsNotification>
            </blockquote>
            <OnLoginNotification 
                alertTitle={"Authenticated"}
                >
                    <span>
                        Logged in as {session?.user.name}
                    </span>
                </OnLoginNotification>

            <main>{children}</main>

            <Footer />
        </>
    )
}