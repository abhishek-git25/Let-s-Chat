import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { LayoutLoaders } from './components/layout/Loaders';
import Groups from './pages/Groups';


const Home = lazy(() => import("./pages/home"))
const Login = lazy(() => import("./pages/login"))
const Chat = lazy(() => import("./pages/chat"))
const NotFound = lazy(() => import("./pages/notfound"))
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"))
const Dashboard = lazy(() => import("./pages/admin/Dashboard"))
const UserManagement = lazy(() => import("./pages/admin/UserManagement"))
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"))
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"))





let user = true;

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<LayoutLoaders/>} >
          <Routes>
            <Route element={<ProtectedRoute user={user} />} >
              <Route path='/' element={<Home />} />
              <Route path='/chat/:chatId' element={<Chat />} />
              <Route path='/groups' element = {<Groups/>} />
            </Route>
            <Route path='/login' element={
              <ProtectedRoute user={!user} redirect='/' >
                <Login />
              </ProtectedRoute>
            } />
            <Route path='/admin' element = {<AdminLogin/>}  />
            <Route path='/admin/dashboard' element = {<Dashboard/>} />
            <Route path='/admin/user-management' element = {<UserManagement/>} />
            <Route path='/admin/messages' element = {<MessageManagement/>} />
            <Route path='/admin/chat-management' element = {<ChatManagement/>} />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
