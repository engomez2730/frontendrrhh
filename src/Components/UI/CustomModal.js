import React from "react";
import { Modal } from "antd";

function CustomModal({ onClose, title, content, ...ModalProps }) {
  return (
    <Modal
      onCancel={onClose}
      title={title}
      footer={null}
      destroyOnClose={true}
      {...ModalProps}
    >
      {content}
    </Modal>
  );
}

export default CustomModal;
