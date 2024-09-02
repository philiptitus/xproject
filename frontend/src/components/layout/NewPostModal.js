import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Spin, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createPost, resetPostCreate, updatePost, resetPostUpdate } from "../../actions/postActions"; // Adjust the import path as necessary
import "./NewPostModal.css"; // Assuming you have a CSS file for styling

const NewPostModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [poster, setPoster] = useState(null);

  const dispatch = useDispatch();

  const postCreate = useSelector((state) => state.postCreate);
  const { loading: createLoading, success: createSuccess, error: createError, post } = postCreate;

  const postUpdate = useSelector((state) => state.postUpdate);
  const { loading: updateLoading, success: updateSuccess, error: updateError } = postUpdate;

  useEffect(() => {
    if (createSuccess) {
      setIsModalVisible(true);
      console.log(post)
      setPoster(post)
      dispatch(resetPostCreate());
    }
    if (createError) {
      message.error(createError);
      dispatch(resetPostCreate());
    }
    if (updateSuccess) {
      message.success("Post CReated successfully");
      handleCloseModal();
      dispatch(resetPostUpdate());
    }
    if (updateError) {
      message.error(updateError);
      dispatch(resetPostUpdate());
    }
  }, [createSuccess, createError, updateSuccess, updateError, dispatch]);

  const handleOpenModal = () => {
    dispatch(createPost());
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    form.resetFields(); // Reset the form when modal is closed
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (poster && poster.id) {
          dispatch(updatePost({ ...poster, ...values }));
        } else {
          console.log("Post Created:", values);
          // Handle post submission, e.g., send values to your server
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <>
      <Button
        type="danger"
        shape="square"
        icon={createLoading ? <Spin /> : <PlusCircleOutlined />}
        size="large"
        onClick={handleOpenModal}
        className="new-post-button"
        disabled={createLoading}
      />
      <Modal
        visible={isModalVisible}
        onCancel={handleCloseModal} // Closes the modal only when the user clicks the cancel (X) button
        footer={null}
        className="new-post-modal"
        destroyOnClose={true} // Ensure the modal's state is reset when closed
      >
        <div className="modal-header">
          <h2>Create New Job Post</h2>
        </div>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="Title"
            label="Title"
            rules={[{ required: true, message: "Please input the title of the service you need!" }]}
          >
            <Input placeholder="Enter your Job/Service Title" maxLength={50} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input the description!" }]}
          >
            <Input.TextArea
              placeholder="Enter the description"
              maxLength={264}
              rows={4}
            />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: "Please input the price!" },
            ]}
          >
            <Input type="number" placeholder="Enter the price" step="0.01" />
          </Form.Item>

          <Form.Item name="location" label="Location">
            <Input placeholder="Enter the location" maxLength={100} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={handleSubmit} htmlType="submit" block className="submit-button" disabled={updateLoading}>
              {updateLoading ? <Spin /> : "Post"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default NewPostModal;
