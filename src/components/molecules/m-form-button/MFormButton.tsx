import { Form } from 'antd';
import React from 'react';
import AButton from '~atoms/a-button';
import { IAButton } from '~atoms/a-button/AButton';

interface MFormButtonProps extends IAButton {}

function MFormButton({ htmlType, children, type, className, size }: MFormButtonProps) {
    return (
        <div>
        <Form.Item>
            <AButton
                htmlType={htmlType}
                type={type}
                className={className}
                size={size}
            >
                {children}
            </AButton>
        </Form.Item>
        </div>
    );
}

export default MFormButton;