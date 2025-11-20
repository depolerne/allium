export type Category =
  | "flowers"
  | "vases"
  | "decorations"
  | "corporate"
  | "newyear"
  | "gifts"
  | "sets"
  | "bouquets";

export type Recipient =
  | "wife"
  | "mom"
  | "children"
  | "colleague"
  | "friend";

export type Occasion =
  | "wedding"
  | "nishan"
  | "gift"
  | "holiday"
  | "birthday";

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  recipients?: Recipient[];
  occasions?: Occasion[];
};