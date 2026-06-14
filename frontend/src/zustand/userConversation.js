import { create } from "zustand";

const useConversation = create((set) => ({
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