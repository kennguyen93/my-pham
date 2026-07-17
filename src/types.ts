export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewsCount: number;
  category: 'sleep' | 'calm' | 'focus' | 'accessories';
  ingredients: string[];
  benefits: string[];
  usage: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    points: { [key: string]: number }; // e.g., { sleep: 3, calm: 1 }
  }[];
}
