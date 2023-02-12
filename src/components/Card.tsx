import React from 'react';
import classNames from 'classnames';
import Title from './Title';

export interface CardProps {
  className?: string;
  children: React.ReactNode;
  title?: string;
}

const Card = (props: CardProps) => {
  const { className, children, title } = props;

  const classes = classNames('bg-blue-100 shadow-md rounded-md p-3', className);

  return (
    <div className={classes}>
      {title && <Title>{title}</Title>}
      {children}
    </div>
  );
};

export default Card;
