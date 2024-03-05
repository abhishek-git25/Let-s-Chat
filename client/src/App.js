import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy } from 'react';

const Home = lazy(() => import("./pages/home"))
const Login = lazy(() => import("./pages/login"))
const Chat = lazy(() => import("./pages/chat"))


function App() {
  return (
    <>
      <BrowserRouter>
        <span><h1>Header</h1></span>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/chat/:chatId' element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
