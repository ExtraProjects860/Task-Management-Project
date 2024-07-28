import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import styles from './LoadingModal.module.css';

function LoadingModal({ show, onHide, message }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body className={styles.modalBody}>
        <Spinner animation="border" style={{ color: '#50B498' }} role="status" />
        <p>{message || "Autenticando usuário..."}</p>
      </Modal.Body>
    </Modal>
  );
}

export default LoadingModal;
