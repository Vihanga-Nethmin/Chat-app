import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/userConversation';
import notificationSound from "../assets/sounds/notification.mp3";

const useNotificationListener = () => {
  const { socket } = useSocketContext();
  const { selectedConversation, incrementUnread } = useConversation();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      // Skip if the message belongs to the chat currently open
      if (newMessage.senderId === selectedConversation?._id) return;

      incrementUnread(newMessage.senderId);

      const sound = new Audio(notificationSound);
      sound.play();

      toast(newMessage.message, { icon: "💬" });
    };

    socket?.on("newMessage", handleNewMessage);

    return () => socket?.off("newMessage", handleNewMessage);
  }, [socket, selectedConversation, incrementUnread]);
};

export default useNotificationListener;