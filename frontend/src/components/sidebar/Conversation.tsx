import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/userConversation";
import { User } from "../../types";

interface ConversationProps {
  conversation: User;
  lastIdx: boolean;
  emoji: string;
}

const Conversation = ({ conversation, lastIdx, emoji }: ConversationProps) => {
  const { selectedConversation, setSelectedConversation, unreadCounts } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id)
  const unreadCount = unreadCounts[conversation._id] || 0;


  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
        ${isSelected ? "bg-sky-500" : ""}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className='w-12 rounded-full bg-gray-500'>
            <img
              src={conversation.profilePic}
              alt='user avatar'
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${conversation.fullName}&background=random`;
              }}
            />
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between items-center'>
            <p className='font-bold text-gray-200'>{conversation.fullName}</p>
            <div className='flex items-center gap-2'>
              {unreadCount > 0 && (
                <span className='badge bg-sky-500 text-white border-none'>
                  {unreadCount}
                </span>
              )}
              <span className='text-xl'>{emoji}</span>
            </div>
          </div>
        </div>
      </div>

      {!lastIdx && <div className='divider my-0 py-0 h-1' />}
    </>
  );
};

export default Conversation;