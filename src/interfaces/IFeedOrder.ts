export interface IFeedOrder {
  _id: string;
  ingredients: ReadonlyArray<string>;
  status: 'done' | 'created' | 'pending';
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}
