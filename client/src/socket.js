import { createContext, useContext, useMemo } from "react"
import io from "socket.io-client"



const SocketContext = createContext()


const useSocket = () => {
    return useContext(SocketContext);
  };

const SocketProvider = ({ children }) => {

    const socket = useMemo(() => io("http://localhost:8000" , { withCredentials : true }), [])


    return(
        <SocketContext.Provider value={socket} >
            {children}
        </SocketContext.Provider>
    )
}

export { useSocket , SocketProvider }