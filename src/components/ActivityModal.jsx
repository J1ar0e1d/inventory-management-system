import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import ActivityFeed from "./ActivityFeed";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`;

export default function ActivityModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <Backdrop onClick={onClose}>
      <ModalBox
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <h2>Activity Log</h2>
        <ActivityFeed />
        <button onClick={onClose} style={{ marginTop: "1rem" }}>
          Close
        </button>
      </ModalBox>
    </Backdrop>
  );
}
