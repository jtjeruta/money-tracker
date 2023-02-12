import { FC } from 'react';

type Props = {
  children: string;
};

const Title: FC<Props> = (props) => {
  return <h3 className="text-md font-bold leading-none tracking-tight text-gray-900">{props.children}</h3>;
};

export default Title;
