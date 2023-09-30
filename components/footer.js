import Image from "next/image";
import Link from "next/link";
import { SiHomeassistant } from "react-icons/si";
import { MdUnsubscribe } from "react-icons/md";
import { NavPost } from "./modals";



export default function Footer() {

    return (
        <>
            <section className="h-[5vh] sm:h-[10vh] z-50">
                <ul className="flex flex-row justify-between p-2 visible sm:invisible fixed bottom-0 left-0 right-0 w-full bg-violet-500/50 max-h-[5vh] items-center gap-1 text-indigo-800 text-center">
                    <li><Link href={"/feeds"}><SiHomeassistant className="text-xl"/></Link></li>
                    <li><NavPost /></li>
                    <li className="flex items-center justify-center w-[100px] h-[5vh]">
                        <Link href={"https://spadeshub.vercel.app"}>
                            <Image 
                            src={'/imgs/facepal_logo.png'}
                            alt="facepal logo"
                            width={800}
                            height={800}
                            priority
                            className="h-auto w-auto"
                            />
                        </Link>
                    </li>
                    <li><Link href={"/account/pal-text"}><MdUnsubscribe className="text-xl"/></Link></li>
                    <li className="text-xl font-bold"><Link href={"/account/make-transfer"}>$</Link></li>
                </ul>

                <div className="invisible sm:visible fixed bottom-0 left-0 right-0 w-full max-h-[10vh] p-2 bg-violet-500/50 flex items-center justify-center">
                    <Link  href={"https://spadeshub.vercel.app"}>
                        <Image 
                        src={'/imgs/facepal_logo.png'}
                        alt="facepal logo"
                        width={800}
                        height={800}
                        priority
                        className="h-[10vh] w-[280px]"
                        />
                    </Link>
                </div>
            </section>
        </>
    )
}