import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Button,TextField } from '@mui/material';
import { db,storage } from '@/settings/firebase.setting';
import { collection,addDoc, updateDoc,doc, query, where,getDocs } from 'firebase/firestore';
import { ref,uploadString,getDownloadURL } from 'firebase/storage';
import ActivityIndicator from '@/utils/activity-indicator';
import Customdialog from './CustomDialog';
import { GiMagicPalm } from 'react-icons/gi';

export default function WritePost() {
    const {data:session} = useSession();
    const [formInput,setFormInput] = useState('');
    const [selectedFile,setSelectedFile] = useState(null);
    const [ showActivityIndicator,setShowActivityIndicator ] = useState(false);

    //CONFIRMATION DIALOG >>>> START
    const [openDialog, setOpenDialog] = useState(false);
    const handleClickOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);
    //CONFIRMATION DIALOG >>>> END

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
        try {
            const usersRef = query(collection(db,'myusers'),where("email",'==',session.user.email));
            const userSnapShot = await getDocs(usersRef);

            const userData = userSnapShot.docs[0].data();

            const docRes = await addDoc(collection(db,'myposts'),{
                body:formInput,
                author:session?.user.name,
                user:session?.user.email,
                postedAt:new Date().getTime(),
                imageUrl:'/null',
                userImg:userData.imageUrl,
            })
            // .then(() => {

            //     setFormInput('');
            //     alert('Your post was published');
            // })
            // .catch(error => console.error(error));

            const imageRef = ref(storage,`myposts/${docRes.id}/image`);
            
            await uploadString(imageRef,selectedFile,'data_url')
            .then(async () => {
                try {
                    const imgUrl = await getDownloadURL(imageRef);
                updateDoc(doc(db,'myposts',docRes.id),{
                    imageUrl:imgUrl,
                });
                setFormInput('');
                setOpenDialog(true);
                setShowActivityIndicator(false);
            } catch (error) {
                
            }
            
        }).catch((e) => console.error(e));
    } catch (error) {
            setFormInput('');
            setOpenDialog(true);
            setShowActivityIndicator(false);
            
        }
    }
    

    return (
        showActivityIndicator
        ?
        <ActivityIndicator />
        :
        <section>
        <form className="flex flex-col border border-gray-100 bg-white rounded-md shadow-md p-3 mb-4 gap-4">
            <div className='flex flex-row items-center gap-4'>
                {/* <Image 
                className="rounded-full" 
                width={48} 
                height={48}
                src={session?.user.image} 
                alt="profile photo" /> */}

                <div className='w-full flex flex-col gap-2'>
                    <TextField
                    multiline={true}
                    className='w-full'
                    placeholder="what's on your mind ..."
                    value={formInput}
                    onChange={(text) => setFormInput(text.target.value)}/>

                    {formInput.length > 0
                    ? 
                    <div className='flex flex-col gap-4'>
                        <input 
                        type='file'
                        accept='image/*'
                        onChange={ImageToPost}
                        />

                        <Button 
                        variant='outlined'
                        className='block w-[100px]'
                        onClick={handleCreatePost}>Post</Button>
                    </div>
                    : null}
                </div>
            </div>
            <hr style={{color:'black'}}/>

            {/* <div className='flex flex-row justify-around  gap-4'>
                <button className='w-full p-2 hover:bg-gray-200 text-gray-500 rounded'>
                    <VideoCameraFrontIcon sx={{ color: 'red' }} />
                    Live video
                </button>
                <button className='w-full p-2 hover:bg-gray-200 text-gray-500 rounded'>
                    <PhotoLibraryIcon sx={{ color: 'green' }} />
                    Photo/video
                </button>
                <button className='w-full p-2 hover:bg-gray-200 text-gray-500 rounded'>
                    <SentimentVerySatisfiedIcon sx={{ color: 'yellow' }} />
                    Feelig/activity
                </button>
            </div> */}
        </form>
        <Customdialog 
        openProp={openDialog} 
        handleCloseProp={handleCloseDialog} 
        title={<span className='flex items-center'>Hey Pal <GiMagicPalm /></span>}>
            <p>Your post has been published successfully!</p>
        </Customdialog>
        </section>
    )
}