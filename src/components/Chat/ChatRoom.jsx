import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import ChatBox from './ChatBox';
import { generateChatId } from '../../utils/chatUtils';

const ChatRoom = () => {
  const { chatId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(chatId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm mb-4 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://raw.githubusercontent.com/yedekho/gaea/refs/heads/main/b36cde54-cf91-4e10-8e50-1b0e12ce9662.png"
              alt="Speaket Logo"
              className="h-8 w-auto"
            />
            <div>
              <span className="text-sm text-gray-500">Chat ID:</span>
              <span className="ml-2 font-mono font-bold">{chatId}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              {copied ? 'Copied!' : 'Copy ID'}
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Exit
            </button>
          </div>
        </div>
        <ChatBox chatId={chatId} currentUserId={user?.uid} />
      </div>
    </div>
  );
};

export default ChatRoom;