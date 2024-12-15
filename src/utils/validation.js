export const validateChatId = (chatId) => {
  return /^\d{6}$/.test(chatId);
};