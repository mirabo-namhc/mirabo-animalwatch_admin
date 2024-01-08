import React from 'react';
import { Input } from 'antd';

export interface IAInput {
    placeholder: string;
    type: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function AInput({ placeholder, type, id, value, onChange }: IAInput) {
    return (
        <div>
            <Input
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default AInput;

