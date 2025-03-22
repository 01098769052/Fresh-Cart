import { Icategory } from "../category/category";

export interface Iproduct {
  sold: number;
  images: string[];
  subcategory: Icategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Icategory;
  brand: Icategory;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}
