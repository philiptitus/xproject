// import React, { useEffect, useState } from 'react';

// const MyComponent = () => {
//   const [postResponse, setPostResponse] = useState(null);
//   const [getResponse, setGetResponse] = useState(null);

//   const authToken = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik53ek53TmV1R3ptcFZTQjNVZ0J4ZyJ9.eyJodHRwczovL2QtaWQuY29tL2ZlYXR1cmVzIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfcHJvZHVjdF9pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX2N1c3RvbWVyX2lkIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfcHJvZHVjdF9uYW1lIjoidHJpYWwiLCJodHRwczovL2QtaWQuY29tL3N0cmlwZV9zdWJzY3JpcHRpb25faWQiOiIiLCJodHRwczovL2QtaWQuY29tL3N0cmlwZV9iaWxsaW5nX2ludGVydmFsIjoibW9udGgiLCJodHRwczovL2QtaWQuY29tL3N0cmlwZV9wbGFuX2dyb3VwIjoiZGVpZC10cmlhbCIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX3ByaWNlX2lkIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfcHJpY2VfY3JlZGl0cyI6IiIsImh0dHBzOi8vZC1pZC5jb20vY2hhdF9zdHJpcGVfc3Vic2NyaXB0aW9uX2lkIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9jaGF0X3N0cmlwZV9wcmljZV9jcmVkaXRzIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9jaGF0X3N0cmlwZV9wcmljZV9pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vcHJvdmlkZXIiOiJnb29nbGUtb2F1dGgyIiwiaHR0cHM6Ly9kLWlkLmNvbS9pc19uZXciOmZhbHNlLCJodHRwczovL2QtaWQuY29tL2FwaV9rZXlfbW9kaWZpZWRfYXQiOiIiLCJodHRwczovL2QtaWQuY29tL29yZ19pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vYXBwc192aXNpdGVkIjpbIlN0dWRpbyJdLCJodHRwczovL2QtaWQuY29tL2N4X2xvZ2ljX2lkIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9jcmVhdGlvbl90aW1lc3RhbXAiOiIyMDI0LTA4LTA4VDEwOjI3OjI0LjUwMFoiLCJodHRwczovL2QtaWQuY29tL2FwaV9nYXRld2F5X2tleV9pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vaGFzaF9rZXkiOiJWRUYyQmhUOWpQWnlqMlhRd1VQLXYiLCJodHRwczovL2QtaWQuY29tL3ByaW1hcnkiOnRydWUsImh0dHBzOi8vZC1pZC5jb20vZW1haWwiOiJtcnBoaWxpcG93YWRlQGdtYWlsLmNvbSIsImh0dHBzOi8vZC1pZC5jb20vcGF5bWVudF9wcm92aWRlciI6InN0cmlwZSIsImlzcyI6Imh0dHBzOi8vYXV0aC5kLWlkLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExNTU3MjEwMjczOTE5NzAzNzQwOSIsImF1ZCI6WyJodHRwczovL2QtaWQudXMuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2QtaWQudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcyMzExMzM3MywiZXhwIjoxNzIzMTk5NzczLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIHJlYWQ6Y3VycmVudF91c2VyIHVwZGF0ZTpjdXJyZW50X3VzZXJfbWV0YWRhdGEgb2ZmbGluZV9hY2Nlc3MiLCJhenAiOiJHenJOSTFPcmU5Rk0zRWVEUmYzbTN6M1RTdzBKbFJZcSJ9.FGh789BYWfbKHTGBA-Yxlz10VtX3VGAlENqvOOe9f5JYGbQv2TVOE9XlzQma2O72tZIkuJ9bGdGJe0-soeQMB-MLtuDrfHnbHHmoZyxDJePx1r6iL7LvFR_4pTBvr-D7G-ax_2TlKlnwq8_8uGcT7w17AZzrTbjVWusHpVnBy-XaHrhxh57LdAtLrsZptYmizV2IlCZZqzUewSuJkIpVFxP3etzRPchz0bHvYxals4bIpkd3q8d69_8RccQPjcWDXCKPg7j5QGCnfudRIjiDwoIbZxDGJ4BNI3YLGHT9wgBZKab7qMXQ8-tzuCTAx2EvfYo4b4TKCLupRCt0aHKwow';

//   useEffect(() => {
//     const makePostRequest = async () => {
//       const options = {
//         method: 'POST',
//         headers: {
//           accept: 'application/json',
//           'content-type': 'application/json',
//           authorization: authToken
//         },
//         body: JSON.stringify({
//           script: {
//             type: 'text',
//             subtitles: 'false',
//             provider: { type: 'microsoft', voice_id: 'en-US-JennyNeural' },
//             input: 'hi i like it here'
//           },
//           config: { fluent: 'false', pad_audio: '0.0' },
//           source_url: 'https://i.redd.it/jonica-keating-v0-wzn6s8h6gex91.jpg?width=1440&format=pjpg&auto=webp&s=77074d1426e2d057052d34525e5d512532073d8f'
//         })
//       };

//       try {
//         const response = await fetch('https://api.d-id.com/talks', options);
//         const data = await response.json();
//         setPostResponse(data);
//       } catch (err) {
//         console.error('POST request error:', err);
//       }
//     };

//     const makeGetRequest = async () => {
//       const options = {
//         method: 'GET',
//         headers: {
//           accept: 'application/json',
//           authorization: authToken
//         }
//       };

//       try {
//         const response = await fetch('https://api.d-id.com/talks/tlk_Szs-BEj5TjWUon0Xppf8J', options);
//         const data = await response.json();
//         setGetResponse(data);
//       } catch (err) {
//         console.error('GET request error:', err);
//       }
//     };

//     makePostRequest();
//     makeGetRequest();
//   }, []);

//   return (
//     <div>
//       <h1>Video Player</h1>
//       {getResponse && getResponse.result_url ? (
//         <video controls>
//           <source src={getResponse.result_url} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       ) : (
//         <p>Loading or no video available.</p>
//       )}
//     </div>
//   );
// };

// export default MyComponent;
import React, { useRef, useEffect } from 'react';
import { FaceMesh } from '@mediapipe/face_mesh';

const AnimatedFace = ({ imageUrl, textToSpeak }) => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.crossOrigin = 'anonymous';
    img.src = imageUrl;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      initializeFaceMesh();
    };

    const initializeFaceMesh = () => {
      const faceMesh = new FaceMesh({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      faceMesh.onResults(onResults);

      faceMesh.send({ image: img });
    };

    const onResults = (results) => {
      if (results.multiFaceLandmarks.length > 0) {
        animateFace(results.multiFaceLandmarks[0]);
      }
    };

    const animateFace = (landmarks) => {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);

      utterance.onstart = () => {
        animationFrameId.current = requestAnimationFrame(() => drawMouth(landmarks, utterance));
      };

      utterance.onend = () => {
        cancelAnimationFrame(animationFrameId.current);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };

      synth.speak(utterance);
    };

    const drawMouth = (landmarks, utterance) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Define the mouth region using landmarks
      const mouthLandmarks = landmarks.slice(13, 17).concat(landmarks.slice(78, 83));

      // Calculate the bounding box of the mouth
      const mouthX = Math.min(...mouthLandmarks.map(l => l.x)) * canvas.width;
      const mouthY = Math.min(...mouthLandmarks.map(l => l.y)) * canvas.height;
      const mouthWidth = (Math.max(...mouthLandmarks.map(l => l.x)) - Math.min(...mouthLandmarks.map(l => l.x))) * canvas.width;
      const mouthHeight = (Math.max(...mouthLandmarks.map(l => l.y)) - Math.min(...mouthLandmarks.map(l => l.y))) * canvas.height;

      // Speech synchronization: Adjust the scale based on utterance progress
      const currentTime = window.speechSynthesis.speaking ? utterance.elapsedTime : 0;
      const totalDuration = utterance.end ? utterance.end - utterance.start : 1;
      const progress = Math.sin((Math.PI * currentTime) / totalDuration);
      const deformationScale = 1 + 0.4 * progress;

      ctx.save();
      ctx.beginPath();
      ctx.translate(mouthX + mouthWidth / 2, mouthY + mouthHeight / 2);
      ctx.scale(1, deformationScale);
      ctx.translate(-(mouthX + mouthWidth / 2), -(mouthY + mouthHeight / 2));
      ctx.drawImage(img, mouthX, mouthY, mouthWidth, mouthHeight, mouthX, mouthY, mouthWidth, mouthHeight);
      ctx.restore();

      animationFrameId.current = requestAnimationFrame(() => drawMouth(landmarks, utterance));
    };

    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [imageUrl, textToSpeak]);

  return <canvas ref={canvasRef} width={360} height={480} />;
};

export default AnimatedFace;
