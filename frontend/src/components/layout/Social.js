import React, { useState, useEffect } from "react";
import { Card, Avatar, Typography, Button, Badge, Modal, Spin, message } from "antd";
import { MessageOutlined, DeleteOutlined } from "@ant-design/icons";
import ChatModal from "./ChatModal";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, resetPostDelete } from "../../actions/postActions";
import { POST_DELETE_RESET } from "../../constants/postConstants";

const { Meta } = Card;
const { Title, Paragraph } = Typography;

const fakeMessages = [
  { sender: "John Doe", content: "Hey there!", timestamp: "10:30 AM" },
  { sender: "You", content: "Hello! How can I help you?", timestamp: "10:32 AM" },
  { sender: "John Doe", content: "I need more information about the product.", timestamp: "10:35 AM" },
];

const Social = ({ post, isTrash = false, isMessage = false }) => {
  const [isChatModalVisible, setIsChatModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const dispatch = useDispatch();
  const postDelete = useSelector((state) => state.postDelete);
  const { loading, error, success } = postDelete;

  useEffect(() => {
    if (success) {
      message.success("Post deleted successfully!");
      dispatch(resetPostDelete());
    }
    if (error) {
      message.error(error);
      dispatch(resetPostDelete());
    }
  }, [dispatch, success, error, post.id]);

  const showChatModal = () => {
    setIsChatModalVisible(true);
  };

  const closeChatModal = () => {
    setIsChatModalVisible(false);
  };

  const showDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };

  const handleDelete = () => {
    dispatch(deletePost(post.id));
    // Keep the modal open while loading
  };

  return (
    <>
      <Card
        hoverable
        style={{
          width: 350,
          margin: "24px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
          overflow: "hidden",
          position: "relative",
          padding: "16px", // Added padding to create space around the content
        }}
        actions={
          isMessage ? [
            <Button icon={<MessageOutlined />} key="comment" onClick={showChatModal}>
              Message Client
            </Button>,
          ] : []
        }
      >
        {isTrash && (
          <DeleteOutlined
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              fontSize: "20px",
              color: "#ff4d4f",
              cursor: "pointer",
            }}
            onClick={showDeleteModal}
          />
        )}
        <Meta
          avatar={
            <Badge dot offset={[5, 0]} color="green">
              <Avatar src={`http://127.0.0.1:8000${post.user_avi}`} size={48} />
            </Badge>
          }
          title={
            <Title level={4} style={{ marginBottom: 0, fontSize: "small" }}>
              {post.user_name}
            </Title>
          }
          description={
            <>
              <Paragraph ellipsis={{ rows: 2, expandable: false }} style={{ fontWeight: "bold" }}>
                Job Title: {post.caption}
              </Paragraph>
              <Paragraph ellipsis={{ rows: 3, expandable: true }} style={{ color: "#595959" }}>
                Job Description: {post.description}
              </Paragraph>
              <Paragraph>
                <strong>Price:</strong> <span style={{ color: "#52c41a" }}>${post.price}</span>
              </Paragraph>
              {post.location && (
                <Paragraph>
                  <strong>Location:</strong> {post.location}
                </Paragraph>
              )}
              <Paragraph style={{ color: "#8c8c8c", fontSize: "12px" }}>
                Posted on {new Date(post.created_date).toLocaleString()}
              </Paragraph>
            </>
          }
        />
      </Card>

      <ChatModal
        visible={isChatModalVisible}
        user_id={post.user}
        onClose={closeChatModal}
        initialUser={{ user: post.user_name, userAvatar: post.user_avi, messages: fakeMessages }}
      />

      <Modal
        title="Confirm Delete"
        visible={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={closeDeleteModal}
        okText="Delete"
        cancelText="Cancel"
        footer={[
          <Button key="cancel" onClick={closeDeleteModal}>
            Cancel
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? <Spin /> : "Delete"}
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this post?</p>
      </Modal>
    </>
  );
};

export default Social;
