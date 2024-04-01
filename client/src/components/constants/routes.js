import { Dashboard, Groups, ManageAccounts, Message } from "@mui/icons-material";

 export const adminTabs = [
    {
    name : "Dashboard",
    path : "/admin/dashboard",
    icon : <Dashboard/>
 },
 {
    name : "Users",
    path : "/admin/user-management",
    icon : <ManageAccounts/>
 },
 {
    name : "Chats",
    path : "/admin/chat-management",
    icon : <Groups/>
 },
 {
    name : "Messages",
    path : "/admin/messages",
    icon : <Message/>
 },


]