

import { CircularProgress } from "@mui/material";


export default function AuthenticationIndicator() {

    return (
        <div className='h-screen w-full absolute top-0 left-0 z-50 flex flex-col justify-center items-center bg-violet-400/10'>
            <CircularProgress color='secondary'/>
            <h1 className="text-center text-xl">Authenticating...</h1>
        </div>
    )
}
