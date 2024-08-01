import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../components/constants/config";

const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${server}` }),
    tagTypes: ["Chat", "User", "Message"],
    endpoints: (builder) => ({
        adminStats: builder.query({
            query: () => ({
                url: "/admin/stats",
                credentials: "include"
            }),
            providesTags: ["Message"]
        }),
        allUser: builder.query({
            query: () => ({
                url: "/admin/users",
                credentials: "include"
            }),
            providesTags: ["User"]
        }),
        allChats: builder.query({
            query: () => ({
                url: "/admin/chats",
                credentials: "include"
            }),
            providesTags: ["Chat"]
        }),
        allMessages: builder.query({
            query: () => ({
                url: "/admin/messages",
                credentials: "include"
            }),
            providesTags: ["Message"]
        }),
    })
})

export default adminApi

export const {
    useAdminStatsQuery,
    useAllUserQuery,
    useAllChatsQuery,
    useAllMessagesQuery
} = adminApi