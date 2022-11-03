import { Button as ButtonUI } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, SyntheticEvent } from 'react';

const Button: FC<{
  type?: 'secondary' | 'primary';
  size?: 'small' | 'medium' | 'large';
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  disabled?: boolean;
  name?: string;
  htmlType?: 'button' | 'submit' | 'reset';
  className?: string;
  children: React.ReactNode;
}> = ButtonUI;

export default Button;
