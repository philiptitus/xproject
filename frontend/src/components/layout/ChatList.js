import React from "react";
import { List, Avatar, Button, Typography, Badge } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Text, Title } = Typography;

const ChatContainer = styled.div`
  background-color: #f0f2f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: auto;
`;

const ChatListItem = styled(List.Item)`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 6px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #e6f7ff;
  }
`;

const LoadMoreButton = styled(Button)`
  background-color: #1890ff;
  color: white;
  border-radius: 6px;

  &:hover {
    background-color: #40a9ff;
    color: white;
  }
`;

const NoMoreChatsText = styled(Text)`
  color: #8c8c8c;
`;

// Utility function to remove duplicates by ID
const removeDuplicates = (chats) => {
  const seenIds = new Set();
  return chats.filter((chat) => {
    if (seenIds.has(chat.id)) {
      return false;
    } else {
      seenIds.add(chat.id);
      return true;
    }
  });
};

const ChatList = React.memo(({ chats, onChatSelect, onLoadMore, totalPages }) => {
  // Remove duplicates before rendering
  const uniqueChats = removeDuplicates(chats);

  return (
    <ChatContainer>
      <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
        Your Conversations
      </Title>
      <List
        itemLayout="horizontal"
        dataSource={uniqueChats}
        renderItem={(item) => (
          <ChatListItem onClick={() => onChatSelect(item)}>
            <Avatar
              src="https://www.svgrepo.com/show/500470/avatar.svg"
              size={50}
            />
            <List.Item.Meta
              title={<Text strong>{item.name}</Text>}
              description={<Text type="secondary">{item.lastMessage}</Text>}
            />
            <Badge
              count={item.unread_count}
              offset={[5, -5]}
              style={{ backgroundColor: "#1890ff" }}
            >
              <MessageOutlined
                style={{ fontSize: "18px", color: "#1890ff" }}
              />
            </Badge>
          </ChatListItem>
        )}
        style={{ maxHeight: "300px", overflowY: "auto" }}
      />
      {uniqueChats.length > 0 && uniqueChats.length / 10 < totalPages ? (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <LoadMoreButton onClick={onLoadMore}>Load More</LoadMoreButton>
        </div>
      ) : (
        <NoMoreChatsText>No more chats to load</NoMoreChatsText>
      )}
    </ChatContainer>
  );
});

export default ChatList;
