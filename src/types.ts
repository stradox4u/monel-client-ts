export interface CurrentUser {
  _id: string;
  avatar?: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

type Statify<T, V> = {
  [U in keyof T as `${string & V}${string & U}`]: T[U];
}

type StatsPieces = {
  Count: number;
  Value: number;
  Units: number;
}
export type PurchaseData = Statify<StatsPieces, "purchases">;
export type SaleData = Statify<StatsPieces, "sales">;

export interface StatSkeleton<T> {
  lastMonthData: T;
  lastWeekData: T;
  thisMonthData: T;
  thisWeekData: T;
}

export interface StatData {
  purchasesData: StatSkeleton<PurchaseData>;
  salesData: StatSkeleton<SaleData>;
}

export interface PurchaseStats {
  purchasesData: StatSkeleton<Statify<StatsPieces, "purchases">>;
  purchasesChange: {
    weekCountChange: number;
    weekVolumeChange: number;
    monthCountChange: number;
    monthVolumeChange: number;
  };
}

export interface SaleStats {
  salesData: StatSkeleton<Statify<StatsPieces, "sales">>;
  salesChange: {
    weekCountChange: number;
    weekVolumeChange: number;
    monthCountChange: number;
    monthVolumeChange: number;
  };
}

export interface Product {
  _id: string;
  name: string;
  price: string;
  picture: string;
}

export interface CartItem {
  product: Product;
  price: number;
  quantity: number;
}

export interface Inventory {
  [key: string]: {
    productId: string;
    stockQuantity: number;
  }
}

export interface TransactionProduct {
  _id: string;
  price: number;
  quantity: number;
  productId: {
    _id: string;
    name: string;
  }
}
export interface Transaction {
  createdAt: Date;
  updatedAt: Date;
  total: number;
  userId: string;
  _id: string;
  products: TransactionProduct[];
}

export type Transactions<Key extends ("purchases" | "sales")> = {
  [U in Key]: Transaction[];
} & { message: string; }

export type ValidationErrors = {
  name: string;
  price: string;
  picture: string;
}