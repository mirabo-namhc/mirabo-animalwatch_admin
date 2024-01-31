import React from 'react';
import { Card as AntCard} from 'antd';
import {  EditOutlined} from '@ant-design/icons'
import './MCard.scss';


interface MCardProps {
    title: React.ReactNode;
    description: React.ReactNode;
    imageUrl: string|undefined;
    onEdit?: () => void;
  }

function MCard({ title, description, imageUrl, onEdit }: MCardProps)  {
    return (
      <AntCard
        hoverable
        cover={<div className="card-cover"><img src={imageUrl} alt="Card Image" /></div>}
        actions={onEdit ? [<EditOutlined key="edit" onClick={onEdit} />] : undefined}
        className="m-card"
      >
        <AntCard.Meta title={title} description={description} />
      </AntCard>
    );
  }export default MCard;
