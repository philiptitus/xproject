import React, { useState, useEffect } from "react";
import { Modal, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import "./ChatModal.css"; // Assuming you have a CSS file for the ChatModal component

const ChatModal = ({ visible, onClose, initialUser, user_id }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showChatList, setShowChatList] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [chatId, setChatId] = useState(user_id); // Add state to manage chat ID

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Reset state whenever the modal opens
  useEffect(() => {
    if (visible) {
      setSelectedChat(initialUser || null);
      setShowChatList(false);
      setConversations([]); // Reset conversations when modal opens
      setPage(1); // Reset page to 1 when modal opens
      setChatId(user_id); // Reset chatId to the initial user_id when modal opens
    }
  }, [visible, initialUser, user_id]);

  useEffect(() => {
    const fetchData = async () => {
      if (visible && showChatList && userInfo) {
        try {
          const config = {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
          setLoading(true);
          const response = await axios.get(`conversations/?page=${page}`, config);

          const newConversations = response.data.results.filter(
            (newChat) => !conversations.some((existingChat) => existingChat.id === newChat.id)
          );

          setConversations((prevConversations) => [...prevConversations, ...newConversations]);
          setTotalPages(response.data.total_pages);
        } catch (error) {
          console.error('Error fetching conversations:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();

    let intervalId;
    if (visible && showChatList) {
      intervalId = setInterval(fetchData, 10000); // Adjusted to 10 seconds
    }

    return () => clearInterval(intervalId);
  }, [page, showChatList, visible, userInfo]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setChatId(chat.id); // Set the chat ID to the selected chat's ID
    setShowChatList(false);
  };

  const handleBack = () => {
    setSelectedChat(null);
    setChatId(user_id); // Reset chatId to the initial user_id when going back
    setShowChatList(true);
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      className="chat-modal"
    >
      {showChatList ? (
        <ChatList
          chats={conversations}
          onChatSelect={handleChatSelect}
          onLoadMore={handleLoadMore}
          totalPages={totalPages}
        />
      ) : (
        selectedChat && (
          <div>
            <ChatWindow
              user={selectedChat.name}
              id={chatId} // Use dynamic chatId
              messages={selectedChat.messages}
              onBack={handleBack}
              userAvatar={selectedChat.avi}
            />
          </div>
        )
      )}
    </Modal>
  );
};

export default ChatModal;
