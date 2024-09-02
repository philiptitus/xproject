import React, { useState, useEffect, useRef } from "react";
import { Input, Button, List, Spin, message, Badge } from "antd";
import { SendOutlined, LeftOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { createChat, resetChatCreate } from '../../actions/notificationActions'; // Update the path to your actions
import "../../pages/styling/ChatWindow.css"; // Ensure this CSS file is created and linked

const ChatWindow = ({ user, userAvatar, id, onBack }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isFetchingMessages, setIsFetchingMessages] = useState(true);
  const [showNewMessageBadge, setShowNewMessageBadge] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const chatCreate = useSelector((state) => state.chatCreate);
  const { loading, success, error } = chatCreate;

  const fetchMessages = async () => {
    if (!isFetchingMessages) return; // Skip fetching if not in sight

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.get(`chats/${id}/`, config);
      const data = response.data;

      if (Array.isArray(data.results)) {
        setChatMessages(data.results);
      } else {
        console.error("Expected an array but received:", data.results);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetchMessages();

    const intervalId = setInterval(fetchMessages, 5000);

    return () => clearInterval(intervalId);
  }, [user, isFetchingMessages]);

  useEffect(() => {
    if (chatMessages.length > 0) {
      if (!isAtBottom(chatContainerRef.current)) {
        setShowNewMessageBadge(true);
      }
    }

    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    if (success) {
      setNewMessage("");
      fetchMessages();
      dispatch(resetChatCreate());
    }
    if (error) {
      message.error(error);
      dispatch(resetChatCreate());
    }
  }, [success, error, dispatch]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newChatMessage = {
        receiver_id: id,
        content: newMessage,
      };

      dispatch(createChat(newChatMessage));
    }
  };

  const handleNewMessageClick = () => {
    scrollToBottom();
    setShowNewMessageBadge(false);
  };

  const isAtBottom = (element) => {
    if (!element) return false;
    return element.scrollHeight - element.scrollTop === element.clientHeight;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFetchingMessages(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (chatContainerRef.current) {
      observer.observe(chatContainerRef.current);
    }

    return () => {
      if (chatContainerRef.current) {
        observer.unobserve(chatContainerRef.current);
      }
    };
  }, []);

  // Force scroll to bottom on mount
  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }, []);

  return (
    <div ref={chatContainerRef} className="chat-window">
      <div className="chat-header">
        <LeftOutlined onClick={onBack} className="back-icon" />
        <span className="chat-user-name">{user}</span>
      </div>
      <div className="chat-container">
        <List
          itemLayout="horizontal"
          dataSource={[...chatMessages].reverse()}
          renderItem={(item) => (
            <List.Item className={item.sender === userInfo.id ? "message-right" : "message-left"}>
              <List.Item.Meta
                description={
                  <div className="message-content">
                    <p>{item.content}</p>
                    <span className="timestamp">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </span>
                    {item.sender === userInfo.id && item.is_read && (
                      <EyeOutlined style={{ marginLeft: '8px', color: '#1890ff' }} />
                    )}
                  </div>
                }
              />
            </List.Item>
          )}
          style={{ maxHeight: "300px", overflowY: "scroll", marginBottom: "16px" }}
        />
        {/* This ref ensures the window scrolls to the latest message */}
        <div ref={messagesEndRef} />
      </div>
      {showNewMessageBadge && (
        <Badge
          count="New Message"
          onClick={handleNewMessageClick}
          style={{
            backgroundColor: '#52c41a',
            cursor: 'pointer',
            position: 'fixed',
            bottom: '70px',
            right: '20px',
            zIndex: 1000,
            transform: 'translate(-50%, -50%)',
            padding: '10px 20px',
            color: '#fff',
            borderRadius: '5px',
            fontSize: '14px'
          }}
        />
      )}
      <div className="chat-input-container">
        <Input.TextArea
          rows={2}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter your message..."
          className="chat-input"
        />
        <Button
          type="primary"
          icon={loading ? <Spin /> : <SendOutlined />}
          onClick={handleSendMessage}
          className="send-button"
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
