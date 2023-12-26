import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";

function ComModal({
  title,
  content,
  centered,
  open,
  okText,
  cancelText,
  onOk,
  onCancel,
  ...props
}) {
  return (
    <Modal
      title={title}
      centered={centered}
      open={open}
      okText={okText}
      cancelText={cancelText}
      onOk={onOk}
      onCancel={onCancel}
      {...props}
    >
      {content}
    </Modal>
  );
}

ComModal.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  centered: PropTypes.bool,
  open: PropTypes.bool,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default ComModal;
