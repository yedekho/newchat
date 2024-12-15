import { ref, push, get, query, orderByChild, equalTo, set, onValue, off, serverTimestamp } from 'firebase/database';
import { database } from './config';

export const createChat = async (chatId) => {
  try {
    const chatRef = ref(database, `chats/${chatId}`);
    await set(chatRef, {
      createdAt: serverTimestamp(),
      messages: {}
    });
    return chatId;
  } catch (error) {
    console.error('Error creating chat:', error);
    throw error;
  }
};

export const getChat = async (chatId) => {
  try {
    const chatRef = ref(database, `chats/${chatId}`);
    const snapshot = await get(chatRef);
    return snapshot.val();
  } catch (error) {
    console.error('Error getting chat:', error);
    throw error;
  }
};

export const subscribeToChat = (chatId, callback) => {
  const chatRef = ref(database, `chats/${chatId}/messages`);
  onValue(chatRef, (snapshot) => {
    const data = snapshot.val();
    const messages = data ? Object.entries(data).map(([id, message]) => ({
      id,
      ...message
    })).sort((a, b) => a.timestamp - b.timestamp) : [];
    callback(messages);
  });

  return () => off(chatRef);
};

export const sendMessage = async (chatId, content, senderId) => {
  try {
    const messagesRef = ref(database, `chats/${chatId}/messages`);
    await push(messagesRef, {
      content,
      senderId,
      timestamp: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};