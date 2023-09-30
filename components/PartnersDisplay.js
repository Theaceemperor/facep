import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";



export function PartnersDisplay({ companyName,companyAddress,compLogo,compDesc,compPhone,compEmail,joinedAt,nextLink,style }) {

    return (
       <section className="flex flex-col gap-1 bg-indigo-500/50 text-violet-950 p-4 rounded-md max-h-[100vh]">
            <div className={`${style}`}>
                <div className="flex flex-col gap-1">
                    <h1 className="font-bold text-lg">{ companyName }</h1>
                    <h4>{ companyAddress }</h4>

                    <Image 
                    src={ compLogo }
                    alt="company image"
                    width={920}
                    height={1080}
                    priority
                    className="rounded-md border border-violet-950/50 shadow-md shadow-indigo-950/50 w-[480px] h-auto"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-center py-1">{ compDesc }</p>
                    <p><span className="font-bold">Company Phone:</span> <span>{ compPhone }</span></p>
                    <p><span className="font-bold">Company Email:</span> { compEmail }</p>
                    <p><span className="font-bold">Partner since</span><small> { joinedAt }</small></p>
                    <Link href={{
                        pathname:'/partners/[pagePath]',
                        query: { pagePath:nextLink }
                    }} 
                    className="flex items-center justify-center py-1 px-2 bg-black/70 font-bold text-xl text-white rounded-md">PROCEED</Link>
                </div>
            </div>
       </section>
    )
}