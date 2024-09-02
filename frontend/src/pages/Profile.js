import React, { useEffect, useState } from "react";
import { Row, Col, Card, Typography, Button, Modal, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteAccount } from "../actions/userAction";
import PostsList from "../components/layout/PostslLst";
import "./styling/Profile.css"; // Assuming you have a CSS file for styling

const { Title, Text } = Typography;

const Profile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const accountDelete = useSelector((state) => state.accountDelete);
  const { loading: deleteLoading, error, success } = accountDelete;

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setUser({
        avatar: `https://projectxfoundation${userInfo.avi}`,
        name: userInfo.username,
        email: userInfo.email,
      });
    }
  }, []);

  useEffect(() => {
    if (success) {
      message.success("Account deleted successfully");
      history.push('/sign-in');
    }
    if (error) {
      message.error(error);
    }
  }, [success, error, history]);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleDeleteAccount = () => {
    if (userInfo.email === "testuser@gmail.com") {
      message.error("This is a test account. Please create your own account to delete it.");
      handleCloseModal();
    } else {
      dispatch(deleteAccount());
      handleCloseModal();
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="layout-content">
      <Row
        gutter={[24, 0]}
        style={{
          display: "flex",
          justifyContent: "center", // Centers the entire column horizontally
        }}
      >
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={16}
          xl={20}
          className="mb-24"
          style={{
            margin: "0 auto", // Ensures the column is centered within the row
            maxWidth: "100%", // Ensures the column doesn't exceed the row width
          }}
        >
          <Card bordered={false} className="profile-card">
            <div className="profile-header">
              <img src={user.avatar} alt="User Avatar" className="profile-avatar" />
              <div className="profile-details">
                <Title level={3} className="profile-name" style={{ fontSize: "small" }}>
                  {user.name}
                </Title>
                <Text className="profile-email">{user.email}</Text>
              </div>
            </div>
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              danger
              block
              className="delete-account-button"
              onClick={handleOpenModal}
              loading={deleteLoading}
            >
              Delete Account
            </Button>
          </Card>
        </Col>
      </Row>
      <br />
      <br />
      <Row
        gutter={[24, 0]}
        style={{
          display: "flex",
          justifyContent: "center", // Centers the entire column horizontally
        }}
        className="your-posts-section"
      >
        <br />
        <br />
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={16}
          xl={20}
          className="mb-24"
          style={{
            margin: "0 auto", // Ensures the column is centered within the row
            maxWidth: "100%", // Ensures the column doesn't exceed the row width
          }}
        >
          <PostsList userInfo={userInfo} />
        </Col>
      </Row>

      <Modal
        visible={isModalVisible}
        onCancel={handleCloseModal}
        onOk={handleDeleteAccount}
        okText="Yes, Delete"
        cancelText="Cancel"
        className="delete-modal"
      >
        <div className="modal-content">
          <Title level={4} className="modal-title">
            Are you sure you want to delete your account?
          </Title>
          <Text className="modal-description">
            This action cannot be undone. All your data will be permanently deleted.
          </Text>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
