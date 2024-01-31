import React from 'react';
import { Card as AntCard,Tooltip} from 'antd';
import {  EditOutlined} from '@ant-design/icons'
import './MCard.scss';


interface MCardProps {
    title: React.ReactNode;
    description: React.ReactNode;
    img: string|undefined;
    onEdit?: () => void;
  }

function MCard({ title, description, img, onEdit }: MCardProps)  {
    return (
      <AntCard
        hoverable
        cover={<div className="card-cover"><img src={img} alt="Card Image" /></div>}
        actions={onEdit ? [<EditOutlined key="edit" onClick={onEdit} />] : undefined}
        className="m-card"
      >
       <Tooltip title={title}>
        <AntCard.Meta title={title} description={description} />
      </Tooltip>
      </AntCard>
    );
  }export default MCard;
