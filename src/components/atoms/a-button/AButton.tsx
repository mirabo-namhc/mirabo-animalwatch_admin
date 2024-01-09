import React from 'react';
import { Button, type ButtonProps, Row } from 'antd';
import clsx from 'clsx';

export interface IAButton extends Omit<ButtonProps, 'type'> {
  type?: 'primary' | 'secondary' | 'sub-primary' | 'destructive' | 'text' | 'tertiary' | 'default';
  className?: ButtonProps['className'];
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

function AButton({ children, type, className, leftIcon, rightIcon, size, ...props }: IAButton) {
  const classAntd = clsx('a-button', className);

  let typeAntd: ButtonProps['type'];
  switch (type) {
    case 'secondary':
    case 'sub-primary':
      typeAntd = 'primary';
      break;
    case 'tertiary':
    case 'destructive':
      typeAntd = 'default';
      break;
    default:
      typeAntd = type;
  }

  return (
    <Button type={typeAntd} className={classAntd} size={size} {...props}>
      <Row
        justify="center"
        align="middle"
        className={clsx({
          'fs-14': size === 'small',
        })}
      >
        {leftIcon && <div className="mr-4 icon-btn">{leftIcon}</div>}
        {children}
        {rightIcon && <div className="ml-4 icon-btn">{rightIcon}</div>}
      </Row>
    </Button>
  );
}

export default AButton;
