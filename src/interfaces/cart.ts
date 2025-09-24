export interface Cart {
  id: number;
  name: string;
  description: string;
  release_date: Date;
  cover_image: string;
  images: string[];
  price: number;
  available_color: string[];
  available_sizes: string[];
  total_price: number;
  quantity: number;
  color: string;
  size: string;
}

export interface CartPostBody {
  color: string;
  quantity: number;
  size: string;
}

export interface CartPatchBody {
  quantity: string;
}
