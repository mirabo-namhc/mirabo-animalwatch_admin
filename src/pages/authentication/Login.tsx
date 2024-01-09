import React, { useEffect, useState } from 'react'
import { Form } from 'antd'
import OLoginForm from '~organisms/o-login-form'
import './Login.scss';

export default function LoginPage() {
    const [form] = Form.useForm();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (values: any) => {
        console.log('Received values of form: ', values);
        // TODO: call api here

        // Reset form
        form.resetFields();
    };

    useEffect(() => {
        
    }, []);

    return (
        <div className='login-page'>
            <h1 className='mb-12'>Login Page</h1>
            <OLoginForm
                form={form} 
                username={username} 
                password={password} 
                handleSubmit={handleSubmit}
                handleUsernameChange={handleUsernameChange}
                handlePasswordChange={handlePasswordChange}
            />
        </div>
    )
}