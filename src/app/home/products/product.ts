export interface ProductListResponse {
  content: Product[];
  totalElements: number;
  totalPages: number;
  numberOfElements: number;
  size: number;
  number: number;
}

export interface Product {
  name: string;
  category: string;
  price: number;
  publishedOn: string;
  isOnSale: number;
  isNew: number;
  isInStock: number;
  purchaseCount: number;
  inCartCount: number;
}
