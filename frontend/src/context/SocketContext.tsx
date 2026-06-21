import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { useAuthContext } from "./AuthContext";
import io, { Socket } from "socket.io-client";

interface SocketContextType {
    socket: Socket | null;
    onlineUsers: string[];
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocketContext must be used within a SocketContextProvider");
    }
    return context;
};

export const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const newSocket = io("/", {
          query: {
              userId: authUser._id,
          }
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users: string[]) => {
          setOnlineUsers(users);
      });

      return () => {
          newSocket.close();
      };
    } else {
      if (socket) {
          socket.close();
          setSocket(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
