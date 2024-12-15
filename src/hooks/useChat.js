import { useState, useEffect } from 'react';
import { subscribeToChat, sendMessage, createChat, getChat } from '../firebase/database';

export const useChat = (chatId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const existingChat = await getChat(chatId);
        if (!existingChat) {
          await createChat(chatId);
        }
        
        const unsubscribe = subscribeToChat(chatId, (newMessages) => {
          setMessages(newMessages);
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error initializing chat:', error);
        setLoading(false);
      }
    };

    initializeChat();
  }, [chatId]);

  const handleSendMessage = async (content, senderId) => {
    try {
      await sendMessage(chatId, content, senderId);
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  };

  return { messages, loading, sendMessage: handleSendMessage };
};