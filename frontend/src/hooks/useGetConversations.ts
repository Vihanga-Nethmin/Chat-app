import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { User } from "../types";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<User[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://172.245.220.221:5000/api/users");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;