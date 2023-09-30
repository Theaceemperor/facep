

import { CircularProgress } from "@mui/material";


export default function ActivityIndicator() {

    return (
        <div className='h-screen w-full absolute top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-violet-400/10'>
            <CircularProgress color='secondary'/>
        </div>
    )
}
