import React, { useEffect, useState } from "react";
import { Card, Typography, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";
import Social from "./Social";
import { message } from "antd";

const { Title } = Typography;

const PostsList = ({ userInfo }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postDelete = useSelector((state) => state.postDelete);
  const {  success: deleteSuccess } = postDelete;
  const postUpdate = useSelector((state) => state.postUpdate);
  const { loading: updateLoading, success: updateSuccess, error: updateError } = postUpdate;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        setLoading(true);
        const response = await axios.get(`https://projectxfoundation/api/v1/album/?page=${page}`, config);
        if (response.data.results && response.data.results.length > 0) {
          setPosts((prevPosts) => [...prevPosts, ...response.data.results]);
          setTotalPages(response.data.total_pages);
        } else {
          message.info("No posts found");
        }
      } catch (error) {
        message.error("Error fetching posts: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, userInfo, updateSuccess, deleteSuccess]);

  useEffect(() => {
    if (updateSuccess || deleteSuccess) {
      setPage(1); // Reset to the first page when a post update is successful
      setPosts([]); // Clear the current posts to refetch them
    }
  }, [updateSuccess, deleteSuccess]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Card bordered={false} className="posts-card">
      <div className="project-ant">
        <div>
          <Title level={5}>Your Posts</Title>
        </div>
      </div>
      <div
        className="ant-list-box table-responsive social-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Centers the Social component list within the card
        }}
      >
        {posts.map((post, index) => (
          <Social key={index} post={post} isTrash={true} />
        ))}
      </div>
      {loading && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Spin size="large" />
        </div>
      )}
      {posts.length === 10 && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            type="primary"
            onClick={handleLoadMore}
            disabled={loading}
            icon={<LoadingOutlined />}
          >
            Load More
          </Button>
        </div>
      )}
    </Card>
  );
};

export default PostsList;
