import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from './ErrorModal.module.css'; // Ajuste o caminho conforme necessário

function ErrorModal({ show, onHide, errorMessage }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body className={styles.modalBody}>
        <h4>Erro</h4>
        <p>{errorMessage || "Ocorreu um erro. Tente novamente."}</p>
        <Button className={styles.button} variant="primary" onClick={onHide}>
          Fechar
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default ErrorModal;
