import React from 'react';
import { Form } from 'antd'
import MFormInput from '~molecules/m-form-input';
import MFormButton from '~molecules/m-form-button';
import './OLoginForm.scss';
import { FormInstance } from 'antd/lib';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

export interface IOLoginForm  {
    form: FormInstance<any>;
    username: string;
    password: string;
    handleSubmit: (values: any) => void;
    handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function OLoginForm({ form, username, password, handleSubmit, handleUsernameChange, handlePasswordChange }: IOLoginForm)  {
    return (
        <Form
            form={form}
            onFinish={handleSubmit}
            className="login-form"
        >
            <div className="login-form-input">
                <MFormInput
                    placeholder="Username"
                    isRequired={true}
                    message="Please input your username!"
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleUsernameChange}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                />
            </div>
            
            <div className="login-form-input">
                <MFormInput
                    placeholder="Password"
                    isRequired={true}
                    message="Please input your password!"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                />
            </div>

            <div className="login-form-button">
                <MFormButton
                    type="primary"
                    htmlType="submit"
                    children="Log in"
                    size="small"
                    className="login-form-atom-button"
                />
            </div>
        </Form>
    );
};

