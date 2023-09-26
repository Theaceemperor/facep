import { createContext, useEffect, useState } from "react";
import { db } from "./firebase.setting";
import { getDocs,collection } from "firebase/firestore";

const AppContext = createContext();

const FacepalContext = ({children}) => {
    const [users,setusers] = useState([]);

    const getUsers = async () => {
        const onSnapShot = await getDocs(collection(db,'users'));
        setusers(onSnapShot.docs.map(doc => {
            return {
                id:doc.id,
                data:{
                    ...doc.data()
                }
            }
        }))
    }

    useEffect(() => {
        getUsers()
    },[])

    return (
        <AppContext.Provider value={{users}} >
            {children}
        </AppContext.Provider>
    )
}

export { AppContext,FacepalContext }