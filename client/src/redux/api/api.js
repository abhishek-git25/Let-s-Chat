import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { server } from "../../components/constants/config"

const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: `${server}` }),
    tagTypes: ["Chat", "User", "Message"],
    endpoints: (builder) => ({
        myChats: builder.query({
            query: () => ({
                url: "/chat/my_chats",
                credentials: "include"
            }),
            providesTags: ["Chat"]
        }),
        searchUser: builder.query({
            query: (name) => ({
                url: `/user/search?name=${name}`,
                credentials: "include"
            }),
            providesTags: ["User"]
        }),
        sendFriendRequest: builder.mutation({
            query: (data) => ({
                url: `/user/sendrequest`,
                method: "PUT",
                credentials: "include",
                body: data
            }),
            invalidatesTags: ["User"]
        }),
        getNotifications: builder.query({
            query: () => ({
                url: `/user/notifications`,
                credentials: "include",
            }),
            keepUnusedDataFor: 0
        }),
        acceptFrientRequest: builder.mutation({
            query: (data) => ({
                url: `/user/acceptrequest`,
                method: "PUT",
                credentials: "include",
                body: data
            }),
            invalidatesTags: ["Chat"]
        }),
        chatDetails: builder.query({
            query: ({ chatId, populate = false }) => {
                let id = chatId ? chatId : ""

                let url = `/chat/${id}`

                if (populate) url += "?populate=true"


                return {
                    url,
                    credentials: "include",
                }
            },
            providesTags: ["Chat"]
        }),

        getAllMessages: builder.query({
            query: ({ chatId, page }) => ({
                url: `/chat/message/${chatId}?page=${page}`,
                credentials: "include"
            }),
            keepUnusedDataFor: 0
        }),
        sendAttachments: builder.mutation({
            query: (data) => ({
                url: `/chat/send_attachment`,
                method: "POST",
                credentials: "include",
                body: data
            }),
        }),
        myGroups: builder.query({
            query: () => ({
                url: `/chat/my_groups`,
                credentials: "include"
            }),
            providesTags: ["Chat"]
        }),

        availableFriends: builder.query({
            query: (chatId) => ({
                url: chatId ? `/user/getFriends/?chatId=${chatId}` : '/user/getFriends',
                credentials: "include"
            }),
            providesTags: ["Chat"]
        }),

        newGroup: builder.mutation({
            query: ({ name, members }) => ({
                url: `/chat/new_group_chat`,
                method: "POST",
                credentials: "include",
                body: { name, members }
            }),
            invalidatesTags: ["Chat"]
        }),

        renameGroup: builder.mutation({
            query: ({ chatId, name }) => ({
                url: `/chat/${chatId}`,
                method: "PUT",
                credentials: "include",
                body: { name }
            }),
            invalidatesTags: ["Chat"]
        }),

        removeGroupMembers: builder.mutation({
            query: ({ chatId, userId }) => ({
                url: `/chat/remove_members`,
                method: "PUT",
                credentials: "include",
                body: { chatId, userId }
            }),
            invalidatesTags: ["Chat"]
        }),

        addGroupMembers: builder.mutation({
            query: ({ chatId, members }) => ({
                url: `/chat/add_members`,
                method: "PUT",
                credentials: "include",
                body: { chatId, members }
            }),
            invalidatesTags: ["Chat"]
        }),

        deleteChat: builder.mutation({
            query: (chatId) => ({
                url: `/chat/${chatId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Chat"]
        }),

        leaveGroup: builder.mutation({
            query: (chatId) => ({
                url: `/chat/leave_group/${chatId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Chat"]
        })
    })
})

export default api

export const {
    useMyChatsQuery,
    useLazySearchUserQuery,
    useSendFriendRequestMutation,
    useGetNotificationsQuery,
    useAcceptFrientRequestMutation,
    useChatDetailsQuery,
    useGetAllMessagesQuery,
    useSendAttachmentsMutation,
    useMyGroupsQuery,
    useAvailableFriendsQuery,
    useNewGroupMutation,
    useRenameGroupMutation,
    useRemoveGroupMembersMutation,
    useAddGroupMembersMutation,
    useDeleteChatMutation,
    useLeaveGroupMutation
} = api