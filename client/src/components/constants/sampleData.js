export const sampleChats = [
    {
        avatar: ["https://tse2.mm.bing.net/th?id=OIP.IrUBHhdMo6wWLFueKNreRwHaHa&pid=Api&P=0&h=220"],
        name: "Abhishek Yadav",
        _id: 1,
        groupChat: false,
        members: ["1", "2"],
        isAdded: false
    },
    {
        avatar: ["https://tse2.mm.bing.net/th?id=OIP.IrUBHhdMo6wWLFueKNreRwHaHa&pid=Api&P=0&h=220"],
        name: "Abhishek Yadav 2",
        _id: 2,
        groupChat: false,
        members: ["1", "2"],
        isAdded: false
    }
]

export const sampleUsers = [
    {
        avatar: "https://tse2.mm.bing.net/th?id=OIP.IrUBHhdMo6wWLFueKNreRwHaHa&pid=Api&P=0&h=220",
        name: "Abhishek Yadav",
        _id: 1,
    },
    {
        avatar: "https://tse2.mm.bing.net/th?id=OIP.IrUBHhdMo6wWLFueKNreRwHaHa&pid=Api&P=0&h=220",
        name: "Abhishek Yadav 2",
        _id: 2,
    }
]

export const sampleNotification = [
    {
        sender: {
            avatar: "https://tse2.mm.bing.net/th?id=OIP.IrUBHhdMo6wWLFueKNreRwHaHa&pid=Api&P=0&h=220",
            name: "Abhishek Yadav",
        },
        _id: 1,
    },
    {
        sender: {
            avatar: "https://tse2.mm.bing.net/th?id=OIP.IrUBHhdMo6wWLFueKNreRwHaHa&pid=Api&P=0&h=220",
            name: "Abhishek Yadav 2"
        },
        _id: 2,
    }
]

export const sampleMessage = [
    {
        attachments: [
            {
                public_id: "anc",
                url: "https://wallpapercave.com/wp/wp5212086.jpg"
            }
        ],
        content: "abc message",
        _id: "ajcxmd",
        sender: {
            _id: "user._id",
            name: "Chaman",
        },
        chat: "chatId",
        createdAt: "2024-02-12T10:41:30.630Z"
    },
    {
        attachments: [
            {
                public_id: "anc 2",
                url: "https://wallpapercave.com/wp/wp5212086.jpg"
            }
        ],
        content: "abc message",
        _id: "ajcxmd",
        sender: {
            _id: "abc",
            name: "Chaman",
        },
        chat: "chatId",
        createdAt: "2024-02-12T10:41:30.630Z"
    }
]

export const dashboardData = {
    users: [
        {
            name: "John Doe",
            avatar: "https://tse2.mm.bing.net/th?id=OIP.IrUBHhdMo6wWLFueKNreRwHaHa&pid=Api&P=0&h=220",
            _id: 1,
            username: "john_doe",
            friends: 20,
            groups: 5,
        },
        {
            name: "Doe John",
            avatar: "https://tse2.mm.bing.net/th?id=OIP.IrUBHhdMo6wWLFueKNreRwHaHa&pid=Api&P=0&h=220",
            _id: 1,
            username: "doe_john",
            friends: 30,
            groups: 5,
        },

    ],
    chats: [
        {
            name: "ABC GROUP",
            avatar: ["https://tse2.mm.bing.net/th?id=OIP.IrUBHhdMo6wWLFueKNreRwHaHa&pid=Api&P=0&h=220"],
            _id: 1,
            groupChat: false,
            members: [
                { _id: "1", avatar: "https://tse2.mm.bing.net/th?id=OIP.IrUBHhdMo6wWLFueKNreRwHaHa&pid=Api&P=0&h=220" },
                { _id: "2", avatar: "https://tse2.mm.bing.net/th?id=OIP.IrUBHhdMo6wWLFueKNreRwHaHa&pid=Api&P=0&h=220" }
            ],
            totalMembers: 2,
            totalMessage: 20,
            creator: {
                name: "John Doe",
                avatar: "https://tse2.mm.bing.net/th?id=OIP.IrUBHhdMo6wWLFueKNreRwHaHa&pid=Api&P=0&h=220"
            }
        },
        {
            name: "John Doe",
            avatar: ["https://tse2.mm.bing.net/th?id=OIP.IrUBHhdMo6wWLFueKNreRwHaHa&pid=Api&P=0&h=220"],
            _id: 2,
            groupChat: false,
            members: [
                { _id: "1", avatar: "https://tse2.mm.bing.net/th?id=OIP.IrUBHhdMo6wWLFueKNreRwHaHa&pid=Api&P=0&h=220" },
                { _id: "2", avatar: "https://tse2.mm.bing.net/th?id=OIP.IrUBHhdMo6wWLFueKNreRwHaHa&pid=Api&P=0&h=220" }
            ],
            totalMembers: 2,
            totalMessage: 20,
            creator: {
                name: "John Doe",
                avatar: "https://tse2.mm.bing.net/th?id=OIP.IrUBHhdMo6wWLFueKNreRwHaHa&pid=Api&P=0&h=220"
            }
        },

    ],
    messages: [
        {
            attachments: [],
            content: "abc message",
            _id: "ajcxmd",
            sender: {
                _id: "user._id",
                name: "Chaman",
                avatar :"https://wallpapercave.com/wp/wp5212086.jpg"
            },
            chat: "chatId",
            groupChat : false,
            createdAt: "2024-02-12T10:41:30.630Z"
        },
        {
            attachments: [
                {
                    public_id: "anc 2",
                    url: "https://wallpapercave.com/wp/wp5212086.jpg"
                }
            ],
            content: "abc message",
            _id: "ajcxmd",
            sender: {
                _id: "abc",
                name: "Chaman",
                avatar :"https://wallpapercave.com/wp/wp5212086.jpg"
            },
            chat: "chatId",
            groupChat : true,
            createdAt: "2024-02-12T10:41:30.630Z"
        }
    ]
}