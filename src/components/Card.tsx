import React from 'react';
import classNames from 'classnames';
import Title from './Title';

export interface CardProps {
  className?: string;
  children: React.ReactNode;
  title?: string;
  onClick?: () => void;
}

const Card = (props: CardProps) => {
  const { className, children, title } = props;

  const classes = classNames('bg-blue-100 dark:bg-zinc-800 shadow-md rounded-md p-3', className);

  return (
    <div className={classes} onClick={props.onClick}>
      {title && <Title>{title}</Title>}
      {children}
    </div>
  );
};

export default Card;
