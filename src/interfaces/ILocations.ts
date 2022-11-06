// export interface ILocation {
//   state: {
//     from?: Location;
//     background?: Location | null;
//   };
//   pathname: string;
// }

export interface ILocation {
  from?: Location;
  background?: Location | null;
  pathname?: string;
}

// и передавать это в хук

// const location = useLocation<ILocation>();
