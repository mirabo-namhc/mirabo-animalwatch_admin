import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import OLoginForm from '~organisms/o-login-form';
import './Login.scss';
import { authActions } from '~store/auth/authSlice';
import { ILoginPayload } from '~types';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTE_URL } from '~constants/endpoint';
import { useAppDispatch } from '~/_lib/redux/hooks';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (values: ILoginPayload) => {
    if (values) {
      const params = {
        username: values?.username,
        password: values?.password,
        onNavigate: () => navigate(APP_ROUTE_URL.INDEX),
      };
      dispatch(authActions.login(params));
    }
  };

  return (
    <div className="login-page">
      <h1 className="mb-12">ログイン</h1>
      <OLoginForm
        form={form}
        username={username}
        password={password}
        handleSubmit={handleSubmit}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
      />
    </div>
  );
}
