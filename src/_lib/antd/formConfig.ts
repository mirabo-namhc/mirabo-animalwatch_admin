/* eslint-disable no-template-curly-in-string */
import type { ConfigProviderProps } from 'antd/es/config-provider';

const formConfig: ConfigProviderProps['form'] = {
    validateMessages: {
        string: {
            max: '${label}は${max}文字以内で入力してください。',
        },
        pattern: {
            mismatch: '再度入力し直してください。',
        },
    },
};

export default formConfig;
