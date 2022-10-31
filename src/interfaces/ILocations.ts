export interface ILocation {
  state: {
    from?: Location;
    background?: Location | null;
  };
  pathname: string;
}
