import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isNewGroup: false,
    isNotification: false,
    isAddMember: false,
    isMobileMenuFriendly: false,
    isSearch: false,
    isFileMenu: false,
    isDeleteMenu: false,
    uploadingLoader: false,
    selectedDeleteChat: {
        chatId: "",
        groupChat: false
    },
    isCall: false,
    stream: "",
    caller: "",
    callAccepted: false,
    callEnded: false,
    callerName: "",
    calleeName: "",
    callee : "",
    receivingCall : false
}

const miscSlice = createSlice({
    name: "misc",
    initialState,
    reducers: {
        setIsNewGroup: (state, action) => {
            state.isNewGroup = action.payload
        },
        setIsAddMember: (state, action) => {
            state.isAddMember = action.payload
        },
        setIsNotification: (state, action) => {
            state.isNotification = action.payload
        },
        setIsMobileMenuFriendly: (state, action) => {
            state.isMobileMenuFriendly = action.payload
        },
        setIsSearch: (state, action) => {
            state.isSearch = action.payload
        },
        setIsFileMenu: (state, action) => {
            state.isFileMenu = action.payload
        },
        setIsDeleteMenu: (state, action) => {
            state.isDeleteMenu = action.payload
        },
        setIsUploadingLoader: (state, action) => {
            state.uploadingLoader = action.payload
        },
        setSelectedDeleteChat: (state, action) => {
            state.selectedDeleteChat = action.payload
        },
        setIsCall: (state, action) => {
            state.isCall = action.payload
        },
        setStream: (state, action) => {
            state.stream = action.payload
        },
        setCaller: (state, action) => {
            state.caller = action.payload
        },
        setCallAccepted: (state, action) => {
            state.callAccepted = action.payload
        },
        setCallEnded: (state, action) => {
            state.callEnded = action.payload
        },
        setCallerName: (state, action) => {
            state.callerName = action.payload
        },
        setCalleeName: (state, action) => {
            state.calleeName = action.payload
        },
        setRecievingCall : (state , action) => {
            state.receivingCall = action.payload
        },
        setCallee : (state, action) => {
            state.callee = action.payload
        }


    }
})

export default miscSlice
export const { setCalleeName, setStream, setCaller, setCallAccepted, setCallEnded, setCallerName, setIsNewGroup, setIsAddMember, setIsNotification, setIsMobileMenuFriendly, setIsSearch, setIsFileMenu, setIsDeleteMenu, setIsUploadingLoader, setSelectedDeleteChat, setIsCall,setCallee,setRecievingCall } = miscSlice.actions