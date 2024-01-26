import { EditOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import clsx from 'clsx';
import React, { ReactNode } from 'react';
import './MCard.scss';
import AImage from '~atoms/a-image';

interface IMCard {
  className?: string;
  thumbnailUrl?: string;
  onActionEdit: () => void;
  title?: ReactNode;
  description?: ReactNode;
}

const { Meta } = Card;

export default function MCard({
  className,
  thumbnailUrl,
  title,
  description,
  onActionEdit,
}: IMCard) {
  const classMCard = clsx('m-card', className);

  return (
    <Card
      className={classMCard}
      cover={<AImage src={thumbnailUrl} />}
      actions={[
        <span onClick={onActionEdit} className="fw-700">
          <EditOutlined className="mr-10" key="edit" />
          詳細
        </span>,
      ]}
    >
      <Meta title={title} description={description} />
    </Card>
  );
}
