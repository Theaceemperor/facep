import { useState } from 'react';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { Button,TextField } from '@mui/material';
import { db, } from '@/settings/firebase.setting';
import { collection, updateDoc,doc, query, where,getDocs } from 'firebase/firestore';
import ActivityIndicator from '@/utils/activity-indicator';
import { useFormik } from 'formik';

export function EditAbout() {
    const {data:session} = useSession();
    const [ showActivityIndicator,setShowActivityIndicator ] = useState(false);
    
    // create post to firestore
    const handleCreatePost = async () => {
        setShowActivityIndicator(true);
        try {
            const usersRef = query(collection(db,'myusers'),where("email",'==',session.user.email));
            const userSnapShot = await getDocs(usersRef);
            const userId = userSnapShot.docs[0].id;

            await updateDoc(doc(db,'myusers',userId),{
                about:values.about,
            }).then(() => {
                handleChange('');
                alert('Your data was sent');
                setShowActivityIndicator(false);
                
            }).catch((e) => console.error(e));
        } catch (error) {
            
        }
    }

    const { handleBlur,handleChange,handleSubmit,values } = useFormik({
        initialValues: { about:'' },
        onSubmit: values => {
            handleCreatePost();
        }
    })
    

    return (
        showActivityIndicator
        ?
        <ActivityIndicator />
        :
        <form className="flex max-w-[480px] flex-col border-2 border-violet-950/20 bg-white bg-violet-950/30 rounded-md shadow-md p-3 gap-4 w-full" onSubmit={handleSubmit}>
            <h3 className='text-center text-indigo-950/80 font-bold'>Update about info</h3>
            <div className='flex flex-row items-center gap-4'>
                <Image 
                className="rounded-full w-[50px] h-[50px]" 
                width={48} 
                height={48}
                src={session?.user.image} 
                alt="profile photo" />

                <div className='w-full flex flex-col gap-2 placeholder:text-indigo-950/80'>
                    <TextField
                    id='about'
                    multiline={true}
                    className='w-full'
                    placeholder="about info..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.about}
                    />

                    {
                        values.about.length > 0
                        ?
                        <Button 
                        variant='outlined'
                        className='block w-[100px]'
                        type='submit'>Update
                        </Button>
                    : null
                    }
                </div>
            </div>
            <hr style={{color:'black',background:'black'}}/>
        </form>
    )
}
export function EditLocation() {
    const {data:session} = useSession();
    const [ showActivityIndicator,setShowActivityIndicator ] = useState(false);
    
    // create post to firestore
    const handleCreatePost = async () => {
        setShowActivityIndicator(true);
        try {
            const usersRef = query(collection(db,'myusers'),where("email",'==',session.user.email));
            const userSnapShot = await getDocs(usersRef);
            const userId = userSnapShot.docs[0].id;

            await updateDoc(doc(db,'myusers',userId),{
                location:values.location,
            }).then(() => {
                handleChange('');
                alert('Your data was sent');
                setShowActivityIndicator(false);
                
            }).catch((e) => console.error(e));
        } catch (error) {
            
        }
    }

    const { handleBlur,handleChange,handleSubmit,values } = useFormik({
        initialValues: { location:'' },
        onSubmit: values => {
            handleCreatePost();
        }
    })
    

    return (
        showActivityIndicator
        ?
        <ActivityIndicator />
        :
        <form className="flex max-w-[480px] flex-col border-2 border-violet-950/20 bg-white bg-violet-950/30 rounded-md shadow-md p-3 gap-4 w-full" onSubmit={handleSubmit}>
            <h3 className='text-center text-indigo-950/80 font-bold'>Update location</h3>
            <div className='flex flex-row items-center gap-4'>
                <Image 
                className="rounded-full w-[50px] h-[50px]" 
                width={48} 
                height={48}
                src={session?.user.image} 
                alt="profile photo" />

                <div className='w-full flex flex-col gap-2 placeholder:text-indigo-950/80'>
                    <TextField
                    id='location'
                    className='w-full'
                    placeholder="current location"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.location}
                    />

                    {
                        values.location.length > 0
                        ?
                        <Button 
                        variant='outlined'
                        className='block w-[100px]'
                        type='submit'>Update
                        </Button>
                    : null
                    }
                </div>
            </div>
            <hr style={{color:'black',background:'black'}}/>
        </form>
    )
}

export function EditPalName() {
    const {data:session} = useSession();
    const [ showActivityIndicator,setShowActivityIndicator ] = useState(false);
    
    // create post to firestore
    const handleCreatePost = async () => {
        setShowActivityIndicator(true);
        try {
            const usersRef = query(collection(db,'myusers'),where("email",'==',session.user.email));
            const userSnapShot = await getDocs(usersRef);
            const userId = userSnapShot.docs[0].id;

            await updateDoc(doc(db,'myusers',userId),{
                name:values.palName,
            }).then(() => {
                handleChange('');
                alert('Your data was sent');
                setShowActivityIndicator(false);
                signOut()
                
            }).catch((e) => console.error(e));
        } catch (error) {
            
        }
    }

    const { handleBlur,handleChange,handleSubmit,values } = useFormik({
        initialValues: { palName:'' },
        onSubmit: values => {
            handleCreatePost();
        }
    })
    

    return (
        showActivityIndicator
        ?
        <ActivityIndicator />
        :
        <form className="flex max-w-[480px] flex-col border-2 border-violet-950/20 bg-white bg-violet-950/30 rounded-md shadow-md p-3 gap-4 w-full" onSubmit={handleSubmit}>
            <h3 className='text-center text-indigo-950/80 font-bold'>Update pal name</h3>
            <div className='flex flex-row items-center gap-4'>
                <Image 
                className="rounded-full w-[50px] h-[50px]" 
                width={48} 
                height={48}
                src={session?.user.image} 
                alt="profile photo" />

                <div className='w-full flex flex-col gap-2 placeholder:text-indigo-950/80'>
                    <TextField
                    id='palName'
                    className='w-full'
                    placeholder="pal name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.palName}
                    />

                    {
                        values.palName.length > 0
                        ?
                        <Button 
                        variant='outlined'
                        className='block w-[100px]'
                        type='submit'>Update
                        </Button>
                    : null
                    }
                </div>
            </div>
            <hr style={{color:'black',background:'black'}}/>
        </form>
    )
}

export function EditPalTag() {
    const {data:session} = useSession();
    const [ showActivityIndicator,setShowActivityIndicator ] = useState(false);
    
    // create post to firestore
    const handleCreatePost = async () => {
        setShowActivityIndicator(true);
        try {
            const usersRef = query(collection(db,'myusers'),where("email",'==',session.user.email));
            const userSnapShot = await getDocs(usersRef);
            const userId = userSnapShot.docs[0].id;

            await updateDoc(doc(db,'myusers',userId),{
                palTag:values.palTag,
            }).then(() => {
                alert('Your data was sent');
                values.palTag = null;
                setShowActivityIndicator(false);
                
            }).catch((e) => console.error(e));
        } catch (error) {
            
        }
    }

    const { handleBlur,handleChange,handleSubmit,values } = useFormik({
        initialValues: { palTag:'' },
        onSubmit: values => {
            handleCreatePost();
        }
    })
    

    return (
        showActivityIndicator
        ?
        <ActivityIndicator />
        :
        <form className="flex max-w-[480px] flex-col border-2 border-violet-950/20 bg-white bg-violet-950/30 rounded-md shadow-md p-3 gap-4 w-full" onSubmit={handleSubmit}>
            <h3 className='text-center text-indigo-950/80 font-bold'>Update Pal Tag e.g.@facepal</h3>
            <div className='flex flex-row items-center gap-4'>
                <Image 
                className="rounded-full w-[50px] h-[50px]" 
                width={48} 
                height={48}
                src={session?.user.image} 
                alt="profile photo" />

                <div className='w-full flex flex-col gap-2 placeholder:text-indigo-950/80'>
                    <TextField
                    id='palTag'
                    className='w-full'
                    placeholder="@facepal"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.palTag}
                    />

                    {
                        values.palTag.length > 0
                        ?
                        <Button 
                        variant='outlined'
                        className='block w-[100px]'
                        type='submit'>Update
                        </Button>
                    : null
                    }
                </div>
            </div>
            <hr style={{color:'black',background:'black'}}/>
        </form>
    )
}

// export function EditAbout() {
//     const {data:session} = useSession();
//     const [ showActivityIndicator,setShowActivityIndicator ] = useState(false);
    
//     // create post to firestore
//     const handleCreatePost = async () => {
//         setShowActivityIndicator(true);
//         try {
//             const usersRef = query(collection(db,'myusers'),where("email",'==',session.user.email));
//             const userSnapShot = await getDocs(usersRef);
//             const userId = userSnapShot.docs[0].id;
//             const userData = userSnapShot.docs[0].data();

//             await updateDoc(doc(db,'myusers',userId),{
//                 about:values.about,
//                 location:values.location,
//                 palName:values.palName,
//                 palTag:values.palTag
//             }).then(() => {
//                 handleChange('');
//                 alert('Your data was sent');
//                 setShowActivityIndicator(false);
                
//             }).catch((e) => console.error(e));
//         } catch (error) {
            
//         }
//     }

//     const { handleBlur,handleChange,handleSubmit,values } = useFormik({
//         initialValues: { about:'',location:'',palName:'',palTag:'' },
//         onSubmit: values => {
//             handleCreatePost();
//         }
//     })
    

//     return (
//         showActivityIndicator
//         ?
//         <ActivityIndicator />
//         :
//         <form className="flex max-w-[480px] flex-col border-2 border-violet-950/20 bg-white bg-violet-950/30 rounded-md shadow-md p-3 gap-4">
//             <h3 className='text-center text-indigo-950/80 font-bold'>Update Profile</h3>
//             <div className='flex flex-row items-center gap-4'>
//                 <Image 
//                 className="rounded-full w-[50px] h-[50px]" 
//                 width={48} 
//                 height={48}
//                 src={session?.user.image} 
//                 alt="profile photo" />

//                 <div className='w-full flex flex-col gap-2 placeholder:text-indigo-950/80'>
//                     <TextField
//                     id='about'
//                     multiline={true}
//                     className='w-full'
//                     placeholder="about info..."
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.about}
//                     />

//                     <TextField
//                     id='location'
//                     className='w-full'
//                     placeholder="edit location..."
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.location}
//                     />

//                     <TextField
//                     id='palName'
//                     className='w-full'
//                     placeholder="pal name..."
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.palName}
//                     />

//                     <TextField
//                     id='palTag'
//                     className='w-full'
//                     placeholder="@palname"
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.palTag}
//                     />

//                     <Button 
//                     variant='outlined'
//                     className='block w-[100px]'
//                     onClick={handleCreatePost}>Update
//                     </Button>
//                 </div>
//             </div>
//             <hr style={{color:'black',background:'black'}}/>
//         </form>
//     )
// }