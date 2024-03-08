import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy } from 'react';
import ProtectedRoute from './components/auth/ProtectedRoute';

const Home = lazy(() => import("./pages/home"))
const Login = lazy(() => import("./pages/login"))
const Chat = lazy(() => import("./pages/chat"))
const NotFound = lazy(() => import("./pages/notfound"))

let user = true;

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute user={user} />} >
            <Route path='/' element={<Home />} />
            <Route path='/chat/:chatId' element={<Chat />} />
          </Route>
          <Route path='/login' element={
            <ProtectedRoute user={!user} redirect='/' >
              <Login />
            </ProtectedRoute>
          } />

          <Route path='*' element = {<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
