import axios from "axios";

const generateVideo = async (text, setLogs) => {
  try {
    setLogs(prevLogs => [...prevLogs, 'Sending request to generate video...']);
    const response = await axios.post('https://api.d-id.com/talks', {
      text: text,
      voice: 'en_us_male',
    }, {
      headers: {
        'Authorization': `Bearer bXJwaGlsaXBvd2FkZUBnbWFpbC5jb20:gxvJwxnWR-Ye69HGFY5mo`,
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200 && response.data.video_url) {
      setLogs(prevLogs => [...prevLogs, 'Video URL:', response.data.video_url]);
      return response.data.video_url;
    } else {
      setLogs(prevLogs => [...prevLogs, 'Unexpected response structure:', JSON.stringify(response.data)]);
      return null;
    }
  } catch (error) {
    if (error.response) {
      setLogs(prevLogs => [...prevLogs, 'Error response:', JSON.stringify(error.response)]);
    } else if (error.request) {
      setLogs(prevLogs => [...prevLogs, 'No response received:', JSON.stringify(error.request)]);
    } else {
      setLogs(prevLogs => [...prevLogs, 'Error in setting up request:', error.message]);
    }
    return null;
  }
};

export default generateVideo;
