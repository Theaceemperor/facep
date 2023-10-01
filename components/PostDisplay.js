import Image from 'next/image';
import React from 'react';
import { useSession } from 'next-auth/react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import PublicIcon from '@mui/icons-material/Public';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Customdialog from './CustomDialog';
import { db } from '@/settings/firebase.setting';
import { doc,deleteDoc, updateDoc } from 'firebase/firestore';
import { TextField,Button } from '@mui/material';
import ActivityIndicator from '@/utils/activity-indicator';
//import { AppContext } from '@/settings/globals';
import { timeAgo } from '@/assets/time-ago';
import { GiMagicPalm } from 'react-icons/gi';

export default function PostDisplay({postID,timePosted,body,postImage,name,imgSrc,postLikes}) {
   // const { usersPost } = React.useContext(AppContext);
    
        // const getPostByAuthorInfo = (authorUID) => {
        //   const filteredUser = usersPost.filter(item => item.id == authorUID);
    
        //   return {
        //     a_name:filteredUser[0].data.author,
        //     a_photo:filteredUser[0].data.image
        //   }
        // }

    const [formInput,setFormInput] = React.useState(body); //FOR POST UPDATE
    //MENU CONTROL >>>> START
    const [anchorEl, setAnchorEl] = React.useState(null); //FOR MENU BUTTON
    const [showActivityIndicator,setShowActivityIndicator] = React.useState(false);

    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget); //HANDLE MENU EVENT
    const handleClose = () => setAnchorEl(null); //HANDLE MENU CLOSE
    //MENU CONTROL >>>> END

    //DIALOG CONTROL >>>> START
    const [openDialog, setOpenDialog] = React.useState(false);
    const handleClickOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);
    //DIALOG CONTROL >>>> END

    //DIALOG CONTROL >>>> START
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const handleClickOpenDeleteDialog = () => setOpenDeleteDialog(true);
    const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);
    //DIALOG CONTROL >>>> END

    //DIALOG CONTROL >>>> START
    const [openUpdateDialogAfter, setOpenUpdateDialogAfter] = React.useState(false);
    const handleCloseUpdateDialogAfter = () => setOpenUpdateDialogAfter(false);
    const handleOpenUpdateDialogAfter = () => setOpenUpdateDialogAfter(true);
    //DIALOG CONTROL >>>> END
   
    //DIALOG CONTROL >>>> START
    const [openDeleteDialogAfter, setOpenDeleteDialogAfter] = React.useState(false);
    const handleCloseDeleteDialogAfter = () => setOpenDeleteDialogAfter(false);
    const handleOpenDeleteDialogAfter = () => setOpenDeleteDialogAfter(true);
    //DIALOG CONTROL >>>> END

    //FUNCTION FOR DELETE POST
    const handleDeletePost = async () => {
        handleCloseDeleteDialog();
        setShowActivityIndicator(true);
        await deleteDoc(doc(db,'myposts',postID))
        .then(() => {
            setShowActivityIndicator(false);
            handleOpenDeleteDialogAfter()
;        })
        .catch((e) => console.error(e))
    }

    {/* FIREBASE POST UPDATE */}
    const postsRef = doc(db, "myposts", `${postID}`);
    const handleUpdatePost = async () => {
        handleCloseDialog();
        setShowActivityIndicator(true); //start activity indicator
        await updateDoc(postsRef, {
            body:formInput,
            updatedAt:new Date().getTime()
        },
        {
            merge:true,
        }).then(() => {
            setShowActivityIndicator(false); //stop activity indicator 
            setFormInput('');
            handleOpenUpdateDialogAfter();
        }).catch((error) => {
            console.error(error); 
        })
    }
    return (
        <>
        { showActivityIndicator ? <ActivityIndicator /> : null }
        <div className="border border-gray-100 bg-white rounded-md shadow-md py-4 mb-4">
            <ul className="flex justify-between px-4">
                <li className="flex flex-row gap-1 items-center">
                    <Image 
                    className="rounded-full w-[45px] h-[45px] border-2 border-indigo-950/80" 
                    src={imgSrc} 
                    width={40} height={40} 
                    alt="profile photo"
                    />                                
                    <div className='flex flex-col'>
                        <small className="text-gray-800">{name}</small>
                        <small className='text-gray-500'>
                            <span>{timeAgo(timePosted)}</span>
                            <PublicIcon sx={{fontSize:15}} />
                        </small>
                    </div>
                </li>
                <li>
                    <div className="text-gray-700">
                        <button className='p-2 hover:bg-gray-200 rounded-full'>
                            <MoreHorizIcon 
                            onClick={handleClick}/>
                        </button>
                    </div>
                </li>
            </ul>
            
            <p className='px-4'>{body}</p>
            <Image  
            src={postImage}
            width={560}
            height={560}
            alt='post image'
            className='w-full h-auto py-4'
            />
            <div className='flex flex-row justify-between px-4 mx-2 bg-violet-950/50 py-1 rounded-xl text-indigo-950/80 shadow-sm border border-indigo-950/50 shadow-indigo-950/80'>
                <div className='flex items-center justify-center gap-1 h-[20px] rounded-full px-1'>
                    {postLikes}<ThumbUpIcon 
                    sx={{ color:'white',fontSize:15,fontWeight:900, }}
                    />
                </div>
                <span className='flex items-center justify-center gap-1 h-[20px] rounded-full px-1'>
                    2 <ChatBubbleOutlineRoundedIcon />
                </span>
            </div>
            <hr style={{color:'black'}}/>

            <div className='flex flex-row justify-around  gap-4 pt-2'>
                <button className='w-full p-2 hover:bg-gray-200 text-gray-500 rounded'>
                    <ThumbUpIcon />
                    Like
                </button>
                <button className='w-full p-2 hover:bg-gray-200 text-gray-500 rounded'>
                    <ChatBubbleOutlineRoundedIcon />
                    Comment
                </button>
                {/* <button className='w-full p-2 hover:bg-gray-200 text-gray-500 rounded'>
                    <ReplyOutlinedIcon  />
                    Share
                </button> */}
            </div>
        </div>  

            {/* MENU BUTTON */}
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
            >
                <MenuItem onClick={handleClickOpenDialog}>Update</MenuItem>
                <MenuItem onClick={handleClickOpenDeleteDialog}>Delete</MenuItem>
            </Menu>

            {/* POST DELETE */}
            <Customdialog 
                openProp={openDeleteDialog} 
                handleCloseProp={handleCloseDialog} 
                title={'Delete Post?'}>
                    <p>
                        confirm post deletion
                    </p>
                    <Button 
                    variant='outlined'
                    color='error'
                    onClick={handleDeletePost}>
                        Yes, delete
                    </Button>
            </Customdialog>

            {/* POST UPDATE */}
            <Customdialog 
                openProp={openDialog} 
                handleCloseProp={handleCloseDialog} 
                title={'Update Post.'}>
                    <TextField
                    multiline={true}
                    className='w-full'
                    placeholder="what's on your mind ..."
                    value={formInput}
                    onChange={(text) => setFormInput(text.target.value)}/>

                    {formInput.length > 0
                    ? <Button 
                    variant='outlined'
                    className='block w-[100px]'
                    onClick={handleUpdatePost}
                    style={{marginTop:8}}>Update</Button>
                    : null}
            </Customdialog>

             {/* Update Dialog */}
             <Customdialog 
                openProp={openUpdateDialogAfter} 
                handleCloseProp={handleCloseUpdateDialogAfter} 
                title={<span className='flex items-center'>Hey Pal <GiMagicPalm /></span>}>
                    <p>Your post was updated successfully!</p>
                </Customdialog>
                
            {/* Like Dialog */}
            <Customdialog 
            openProp={openDeleteDialogAfter} 
            handleCloseProp={handleCloseDeleteDialogAfter} 
            title={<span className='flex items-center'>Hey Pal <GiMagicPalm /></span>}>
                <p>Selected post has been deleted!</p>
            </Customdialog>
        </>
    )
}