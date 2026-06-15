export interface User {
    _id: string;
    fullName: string;
    username: string;
    profilePic: string;
}

export interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    message: string;
    createdAt: string;
    updatedAt?: string;
    shouldShake?: boolean;
}