type reviewType = {
  comment: string;
  date: Date;
  rate: number;
  user: number;
  _id: string;
};
export interface productType {
  _id: string;
  category: string;
  cover: string;
  description: string;
  discount: number;
  images: string[];
  name: string;
  price: number;
  rating: number;
  reviews: reviewType[];
  stock: number;
  subcategory: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface PaginationType {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  totalPage: number;
}
