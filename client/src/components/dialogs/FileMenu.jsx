import { Menu, MenuItem, MenuList, Tooltip } from '@mui/material'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsFileMenu, setIsUploadingLoader } from '../../redux/reducers/misc'
import { AudioFile as AudioFileIcon, Image as ImageIcon, UploadFile as UploadFileIcon, VideoFile as VideoFileIcon } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { useSendAttachmentsMutation } from '../../redux/api/api'

const FileMenu = ({ anchorE1, chatId }) => {

    const { isFileMenu } = useSelector((state) => state.misc)

    const imageRef = useRef(null)
    const videoRef = useRef(null)
    const audioRef = useRef(null)
    const fileRef = useRef(null)


    const dispatch = useDispatch()

    const [sendAttachments] = useSendAttachmentsMutation()

    const closeFileMenu = () => {
        dispatch(setIsFileMenu(false))
    }

    const selectRef = (ref) => {
        ref.current.click()
    }

    const fileChangeHandler = async (e, key) => {
        const files = Array.from(e.target.files)

        if (files.length <= 0) return

        if (files.length > 5) return toast.error(`You can only send 5 ${key} at a time`)

        dispatch(setIsUploadingLoader(true))

        const toastId = toast.loading(`Sending ${key}...`)

        closeFileMenu()

        try {

            console.log(chatId , files , "46");
            const myForm = new FormData()
            myForm.append("chatId", chatId)
            files.forEach((file) => myForm.append("files", file))
            console.log(myForm  , "49");
            const res = await sendAttachments(myForm)
            console.log(res , "50");
            if(res.data){
                toast.success(`${key} sent successfully` , {
                    id : toastId
                })
            }else{
                toast.error(`Failed to send ${key}` , {
                    id : toastId
                })
            }

        } catch (error) {
            toast.error(error, { id: toastId })
        }
        finally {
            dispatch(setIsUploadingLoader(false))
        }
    }


    return (
        <Menu anchorEl={anchorE1} open={isFileMenu} onClose={closeFileMenu}>
            <MenuList>
                <MenuItem onClick={() => selectRef(imageRef)}>
                    <Tooltip title="Image" placement='right'>
                        <ImageIcon />
                    </Tooltip>
                    <input type='file' multiple ref={imageRef} accept='image/png, image/jpeg , image/gif' style={{ display: "none" }} onChange={(e) => fileChangeHandler(e, "Images")} />
                </MenuItem>

                <MenuItem onClick={() => selectRef(audioRef)}>
                    <Tooltip title="Audio" placement='right'>
                        <AudioFileIcon />
                    </Tooltip>
                    <input type='file' ref={audioRef} multiple accept='audio/mpeg, audio/wav , audio/ogg' style={{ display: "none" }} onChange={(e) => fileChangeHandler(e, "Audios")} />
                </MenuItem>
                <MenuItem onClick={() => selectRef(videoRef)}>
                    <Tooltip title="Video" placement='right'>
                        <VideoFileIcon />
                    </Tooltip>
                    <input type='file' ref={videoRef} multiple accept='video/mp4, video/webm , video/ogg' style={{ display: "none" }} onChange={(e) => fileChangeHandler(e, "Videos")} />
                </MenuItem>
                <MenuItem onClick={() => selectRef(fileRef)}>
                    <Tooltip title="File" placement='right'>
                        <UploadFileIcon />
                    </Tooltip>
                    <input type='file' ref={fileRef} multiple accept='*' style={{ display: "none" }} onChange={(e) => fileChangeHandler(e, "Files")} />
                </MenuItem>
            </MenuList>

        </Menu>
    )
}

export default FileMenu
