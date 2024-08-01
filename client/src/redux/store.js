import {configureStore} from '@reduxjs/toolkit'
import authSlice from './reducers/auth'
import api from './api/api'
import miscSlice from './reducers/misc'
import chatSlice from './reducers/chat'
import adminApi from './api/adminApi'

const store = configureStore({
    reducer : {
        [authSlice.name] : authSlice.reducer,
        [chatSlice.name] : chatSlice.reducer,
        [api.reducerPath] : api.reducer,
        [miscSlice.name] : miscSlice.reducer,
        [adminApi.reducerPath] : adminApi.reducer
    },
    middleware : (defaultMiddleware) => [...defaultMiddleware() , api.middleware , adminApi.middleware],
    // middleware : (defaultMiddleware) => [...defaultMiddleware() , adminApi.middleware]

})

export default store