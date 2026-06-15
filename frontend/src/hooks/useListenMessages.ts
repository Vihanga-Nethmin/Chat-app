import { useEffect } from 'react'

import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/userConversation'
import { Message } from '../types'
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext()
  const { messages, setMessages, selectedConversation } = useConversation()

  useEffect(() => {
    const handleNewMessage = (newMessage: Message) => {
        if (newMessage.senderId !== selectedConversation?._id) return;

        newMessage.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.play();

        setMessages([...messages, newMessage])
    }

    socket?.on("newMessage", handleNewMessage)

    return () => { socket?.off("newMessage", handleNewMessage) }
  }, [socket, setMessages, messages, selectedConversation])
}

export default useListenMessages