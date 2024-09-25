import React, { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const VideoCall = () => {
  const userVideoRef = useRef();
  const partnerVideoRef = useRef();
  const socketRef = useRef();
  const peerRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect('/');

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideoRef.current.srcObject = stream;
        socketRef.current.emit('join room', 'room1');

        socketRef.current.on('other user', (userId) => {
          callUser(userId, stream);
        });

        socketRef.current.on('user joined', (userId) => {
          peerRef.current = createPeer(userId, socketRef.current.id, stream);
        });

        socketRef.current.on('signal', ({ from, signal }) => {
          peerRef.current.signal(signal);
        });
      });
  }, []);

  const callUser = (userId, stream) => {
    peerRef.current = createPeer(userId, socketRef.current.id, stream);
  };

  const createPeer = (userId, callerId, stream) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on('signal', (signal) => {
      socketRef.current.emit('signal', { signal, to: userId });
    });
    peer.on('stream', (stream) => {
      partnerVideoRef.current.srcObject = stream;
    });
    return peer;
  };

  return (
    <div>
      <video ref={userVideoRef} autoPlay />
      <video ref={partnerVideoRef} autoPlay />
    </div>
  );
};

export default VideoCall;
