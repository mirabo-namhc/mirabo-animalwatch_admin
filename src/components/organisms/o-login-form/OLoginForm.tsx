import React from 'react';
import { Form } from 'antd';
import MFormInput from '~molecules/m-form-input';
import MFormButton from '~molecules/m-form-button';
import './OLoginForm.scss';
import { FormInstance } from 'antd/lib';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

export interface IOLoginForm {
  form: FormInstance<any>;
  username: string;
  password: string;
  handleSubmit: (values: any) => void;
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function OLoginForm({
  form,
  username,
  password,
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
}: IOLoginForm) {
  return (
    <Form form={form} onFinish={handleSubmit} className="login-form">
      <div className="login-form-input">
        <b>ユーザー</b>
        <MFormInput
          placeholder="ユーザー名"
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          prefix={<UserOutlined className="site-form-item-icon" />}
          rules={[{
            required: true,
            message: "ユーザー名を入力してください",
            whitespace: true,
          }]}
        />
      </div>

      <div className="login-form-input mt-20">
        <b>パスワード</b>
        <MFormInput
          placeholder="パスワード"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          prefix={<LockOutlined className="site-form-item-icon" />}
          rules={[{
            required: true,
            message: "パスワードを入力してください",
          }]}
        />
      </div>

      <div className="login-form-button mt-20">
        <MFormButton
          type="primary"
          htmlType="submit"
          children="ログイン"
          size="small"
          className="login-form-atom-button"
        />
      </div>
    </Form>
  );
}
