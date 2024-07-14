import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { LayoutLoaders } from './components/layout/Loaders';
import Groups from './pages/Groups';
import axios from "axios"
import { server } from './components/constants/config';
import { useDispatch, useSelector } from "react-redux"
import { userExists, userNotExist } from './redux/reducers/auth';
import { Toaster } from 'react-hot-toast'
import { SocketProvider } from './socket';


const Home = lazy(() => import("./pages/home"))
const Login = lazy(() => import("./pages/login"))
const Chat = lazy(() => import("./pages/chat"))
const NotFound = lazy(() => import("./pages/notfound"))
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"))
const Dashboard = lazy(() => import("./pages/admin/Dashboard"))
const UserManagement = lazy(() => import("./pages/admin/UserManagement"))
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"))
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"))





// let user = true;

function App() {

  const { user, loader } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(`${server}/user/me`, { withCredentials: true })
      .then((res) => dispatch(userExists(res.data.data)))
      .catch((err) => dispatch(userNotExist()))
  }, [])




  return (
    <>
      {loader ? <LayoutLoaders /> :
        <BrowserRouter>
          <Suspense fallback={<LayoutLoaders />} >
            <Routes>
              <Route element={<SocketProvider><ProtectedRoute user={user} /></SocketProvider>} >
                <Route path='/' element={<Home />} />
                <Route path='/chat/:chatId' element={<Chat />} />
                <Route path='/groups' element={<Groups />} />
              </Route>
              <Route path='/login' element={
                <ProtectedRoute user={!user} redirect='/' >
                  <Login />
                </ProtectedRoute>
              } />
              <Route path='/admin' element={<AdminLogin />} />
              <Route path='/admin/dashboard' element={<Dashboard />} />
              <Route path='/admin/user-management' element={<UserManagement />} />
              <Route path='/admin/messages' element={<MessageManagement />} />
              <Route path='/admin/chat-management' element={<ChatManagement />} />

              <Route path='*' element={<NotFound />} />
            </Routes>
          </Suspense>
          <Toaster position='bottom-center' />
        </BrowserRouter>}
    </>
  );
}

export default App;
