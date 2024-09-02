import React, { useState, useEffect } from "react";
import { Row, Col, Card, Typography, Spin, message, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons"; // Import the icon
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Social from "../components/layout/Social";
import "./styling/Profile.css"; // Assuming you have a CSS file for styling

const { Title } = Typography;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postUpdate = useSelector((state) => state.postUpdate);
  const { loading: updateLoading, success: updateSuccess, error: updateError } = postUpdate;

  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/sign-in");
    }
  }, [userInfo, history]);

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
        const response = await axios.get(`https://projectxfoundation/api/v1/posts/?page=${page}`, config);
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
  }, [page, userInfo, updateSuccess]);

  useEffect(() => {
    if (updateSuccess) {
      setPage(1); // Reset to the first page when a post update is successful
      setPosts([]); // Clear the current posts to refetch them
    }
  }, [updateSuccess]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (!userInfo) {
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
          <Card bordered={false} className="criclebox cardbody h-full">
            <div className="project-ant">
              <div style={{ textAlign: "center" }}>
                <Title style={{ textAlign: "center" }} level={5}>New Posts</Title>
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
                <Social key={index} post={post} isMessage={post.user !== userInfo.id} />
              ))}
            </div>
            {loading && (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Spin size="large" />
              </div>
            )}
            {posts.length == 10 && (
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
        </Col>
      </Row>
    </div>
  );
};

export default Home;
