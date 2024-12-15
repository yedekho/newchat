import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { validateChatId } from '../../utils/validation';
import { generateChatId } from '../../utils/chatUtils';

const Welcome = () => {
  const [chatId, setChatId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleJoin = () => {
    if (validateChatId(chatId)) {
      navigate(`/chat/${chatId}`);
    } else {
      setError('Please enter a valid 6-digit Chat ID');
    }
  };

  const handleCreateNewChat = () => {
    const newChatId = generateChatId();
    navigate(`/chat/${newChatId}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <img
            src="https://raw.githubusercontent.com/yedekho/gaea/refs/heads/main/b36cde54-cf91-4e10-8e50-1b0e12ce9662.png"
            alt="Speaket Logo"
            className="mx-auto h-24 w-auto"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome to Speaket
          </h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {user ? (
            <>
              <div>
                <input
                  type="text"
                  value={chatId}
                  onChange={(e) => setChatId(e.target.value)}
                  placeholder="Enter any Speaket Chat ID"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={6}
                />
              </div>
              <button
                onClick={handleJoin}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Join Chat
              </button>
              <button
                onClick={handleCreateNewChat}
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Create New Chat
              </button>
              <button
                onClick={logout}
                className="w-full py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="flex-1 py-3 bg-white border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Welcome;