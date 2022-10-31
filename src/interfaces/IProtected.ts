import { ReactElement } from 'react';

export interface IProtected {
  exact?: boolean;
  path?: string;
  children: ReactElement | JSX.Element;
}
