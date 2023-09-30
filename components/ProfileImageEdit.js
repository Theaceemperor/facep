import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@mui/material';
import { db,storage } from '@/settings/firebase.setting';
import { collection, updateDoc,doc, query, where, getDocs } from 'firebase/firestore';
import { ref,uploadString,getDownloadURL } from 'firebase/storage';
import Image from 'next/image';
import ActivityIndicator from '@/utils/activity-indicator';

export default function ProfileEdit() {
    const {data:session} = useSession();
    const [selectedFile,setSelectedFile] = React.useState(null);
    const [ showActivityIndicator,setShowActivityIndicator ] = React.useState(false);

    //get image file and convert to base64 string
    const ImageToPost = (e) => {
        const reader = new FileReader();

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readEvent) => {
            setSelectedFile(readEvent.target.result);
        }
    }

    
    // create post to firestore
    const handleCreatePost = async () => {
        setShowActivityIndicator(true);
        const q = query(collection(db,'myusers'),where('email','==',session.user.email));
        const onSnapShot = await getDocs(q)
        const docRes = onSnapShot.docs[0];

        const imageRef = ref(storage,`myusers/${docRes.id}/image`);

        await uploadString(imageRef,selectedFile,'data_url')
        .then(async () => {
            const imgUrl = await getDownloadURL(imageRef);
            updateDoc(doc(db,'myusers',docRes.id),{
                imageUrl:imgUrl,
            });
            setSelectedFile(null) == null;
            alert('Your profile image was updated');
            signOut();
            setShowActivityIndicator(false)
            
        }).catch((e) => console.error(e));
    }

    

    return (
        showActivityIndicator
        ?
        <ActivityIndicator />
        :
        <form className="max-w-[480px] w-full text-indigo-950/80 flex flex-col border-2 border-violet-950/20 bg-violet-950/30 rounded-md shadow-md p-3 gap-4">
            <div className='flex flex-row items-center gap-2'>
                <Image 
                className="rounded-full w-[50px] h-[50px]" 
                width={48} 
                height={48}
                src={'/facepal_logo.png'} 
                alt="profile photo"
                />

                <div className=' flex flex-col gap-2'>
                    <label>
                        Update Profile image
                    </label>
                    <input 
                    type='file'
                    accept='image/*'
                    onChange={ImageToPost}
                    />

                    <hr style={{color:'violet'}}/>

                    {selectedFile != null
                    ? 
                    <Button 
                    variant='outlined'
                    className='block w-[100px]'
                    onClick={handleCreatePost}
                    >UPDATE</Button>
                    : null}
                </div>
            </div>
        </form>
    )
}