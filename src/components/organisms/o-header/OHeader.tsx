import { Layout } from 'antd'
import React from 'react'
import './OHeader.scss'


export default function OHeader() {
    return (
        <Layout.Header className="o-header h-50 dis-flex jc-center ai-center bg-gray-0 pos-sticky top-0 z-1 px-16 fw-700 fs-20 gray">
            カテゴリ一覧
        </Layout.Header>
    )
}