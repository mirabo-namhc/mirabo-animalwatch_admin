import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import { Col, Form } from "antd";

const { Quill } = ReactQuill;
const Block = Quill.import("blots/block");
Block.tagName = "div";
Quill.register(Block);

function MyEditor({ quillRef, height, label, colwidth, style, ...props }) {
  useEffect(() => {
    const toolbars = document.querySelectorAll(".ql-toolbar");
    const containers = document.querySelectorAll(".ql-editor");
    if (toolbars || containers) {
      toolbars.forEach((toolbar) => {
        toolbar.style.display = "none";
      });
      containers.forEach((container) => {
        container.style.borderTop = "1px solid #ccc";
        container.style.height = `${height}px`;
      });
    }
  }, []);

  return (
    <Col xs={colwidth || 24}>
      <Form.Item label={label} {...props}>
        <ReactQuill ref={quillRef} style={style} />
      </Form.Item>
    </Col>
  );
}

MyEditor.propTypes = {
  quillRef: PropTypes.object,
  height: PropTypes.number,
  colwidth: PropTypes.number,
  label: PropTypes.string,
  style: PropTypes.object,
};

export default MyEditor;
