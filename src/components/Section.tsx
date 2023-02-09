import { FC, ReactNode } from 'react';
import classNames from 'classnames';

type Props = {
  children: ReactNode;
  title?: string;
  className?: string;
};

const Section: FC<Props> = (props) => (
  <section className={classNames('p-3', props.className)}>
    {props.title && (
      <label className="text-md font-bold leading-none tracking-tight text-gray-900">{props.title}</label>
    )}
    {props.children}
  </section>
);

export default Section;
