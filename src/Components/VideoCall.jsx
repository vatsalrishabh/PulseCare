import React, { useEffect, useRef, useState } from 'react';
import { Button, IconButton } from '@mui/material';
import { VideoCall as VideoCallIcon, Mic as MicIcon, MicOff as MicOffIcon, Videocam as VideocamIcon, VideocamOff as VideocamOffIcon } from '@mui/icons-material';
import io from 'socket.io-client';
import Peer from 'simple-peer';

// Connect to the Socket.IO server
const socket = io('http://localhost:3000'); // Adjust URL as needed

const VideoCall = () => {
  const [stream, setStream] = useState(null);
  const [peer, setPeer] = useState(null);
  const [callActive, setCallActive] = useState(false);
  const videoRef = useRef(null);
  const localVideoRef = useRef(null);

  useEffect(() => {
    // Get user media
    const startVideo = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(mediaStream);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = mediaStream;
        }

        // When someone calls
        socket.on('call', ({ signal, from }) => {
          setCallActive(true);
          const newPeer = new Peer({ initiator: false, trickle: false, stream: mediaStream });

          newPeer.on('signal', (signal) => {
            socket.emit('answer', { signal, to: from });
          });

          newPeer.on('stream', (remoteStream) => {
            if (videoRef.current) {
              videoRef.current.srcObject = remoteStream;
            }
          });

          newPeer.signal(signal);
          setPeer(newPeer);
        });

        // When someone answers
        socket.on('answer', ({ signal }) => {
          peer.signal(signal);
        });

      } catch (err) {
        console.error('Error accessing media devices.', err);
      }
    };

    startVideo();

    // Cleanup on unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [peer, stream]);

  const startCall = () => {
    const newPeer = new Peer({ initiator: true, trickle: false, stream });

    newPeer.on('signal', (signal) => {
      socket.emit('call', { signal });
    });

    newPeer.on('stream', (remoteStream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = remoteStream;
      }
    });

    setPeer(newPeer);
  };

  const endCall = () => {
    if (peer) {
      peer.destroy();
      setPeer(null);
      setCallActive(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Main video container */}
      <div className="flex-grow relative bg-gray-800">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
        ></video>

        {/* Small video screens */}
        <div className="absolute bottom-4 right-4 space-y-2">
          <div className="w-32 h-24 bg-gray-700 rounded-lg overflow-hidden">
            <video ref={localVideoRef} className="w-full h-full object-cover" autoPlay muted playsInline></video>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between p-4 bg-gray-800">
        {callActive ? (
          <Button variant="contained" color="secondary" onClick={endCall}>
            End Call
          </Button>
        ) : (
          <Button variant="contained" color="primary" startIcon={<VideoCallIcon />} onClick={startCall}>
            Start Call
          </Button>
        )}
        <div className="flex space-x-4">
          <IconButton color="primary" aria-label="mute microphone">
            <MicIcon />
          </IconButton>
          <IconButton color="secondary" aria-label="turn off camera">
            <VideocamOffIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
