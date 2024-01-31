import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import clsx from 'clsx';
import React, { ReactNode } from 'react';
import './MCard.scss';
import AImage from '~atoms/a-image';

interface IMCard {
  className?: string;
  thumbnailUrl?: string;
  onActionEdit: () => void;
  onActionDelete?: () => void;
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
  onActionDelete,
}: IMCard) {
  const [actions, setActions] = React.useState<React.ReactNode[]>([]);

  React.useEffect(() => {
    const actionsNode: React.ReactNode[] = [];
    if (onActionEdit) {
      actionsNode.push(
        <span onClick={onActionEdit} className="fw-700">
          <EditOutlined className="mr-10" key="edit" />
          詳細
        </span>,
      );
    }

    if (onActionDelete) {
      actionsNode.push(
        <span onClick={onActionDelete} className="fw-700">
          <DeleteOutlined className="mr-10" key="edit" style={{ color: 'red' }} />
          詳細
        </span>,
      );
    }

    setActions(actionsNode);
  }, []);

  const classMCard = clsx('m-card', className);

  return (
    <Card className={classMCard} cover={<AImage src={thumbnailUrl} />} actions={actions}>
      <Meta title={title} description={description} />
    </Card>
  );
}
