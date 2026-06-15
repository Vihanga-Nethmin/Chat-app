import { create } from "zustand";
import { User, Message } from "../types";

interface ConversationState {
    selectedConversation: User | null;
    setSelectedConversation: (selectedConversation: User | null) => void;
    messages: Message[];
    setMessages: (messages: Message[]) => void;
    unreadCounts: Record<string, number>;
    incrementUnread: (senderId: string) => void;
}

const useConversation = create<ConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => {
        set((state) => {
            const unreadCounts = { ...state.unreadCounts };
            if (selectedConversation) {
                delete unreadCounts[selectedConversation._id];
            }
            return { selectedConversation, unreadCounts };
        });
    },
    messages: [],
    setMessages: (messages) => set({ messages }),

    unreadCounts: {},
    incrementUnread: (senderId) =>
        set((state) => ({
            unreadCounts: {
                ...state.unreadCounts,
                [senderId]: (state.unreadCounts[senderId] || 0) + 1,
            },
        })),
}));

export default useConversation;