import React from 'react';
import { createCache, StyleProvider } from '@ant-design/cssinjs';
import type Entity from '@ant-design/cssinjs/es/Cache';
import { ConfigProvider } from 'antd';
import ja_JP from 'antd/locale/ja_JP';

import form from './formConfig';
import theme from './themeConfig';

const AntdProvider = ({ children }: { children: React.ReactNode }) => {
    const cache = React.useMemo<Entity>(() => createCache(), [createCache]);

    return (
        <StyleProvider cache={cache}>
            <ConfigProvider theme={theme} locale={ja_JP} form={form}>
                {children}
            </ConfigProvider>
        </StyleProvider>
    );
};

export default AntdProvider;
