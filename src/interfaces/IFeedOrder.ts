export interface IFeedOrder {
  _id: string;
  ingredients: string;
  status: 'done' | 'created' | 'pending';
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}
