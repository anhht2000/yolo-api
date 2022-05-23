export interface GetAllProductOption {
  name?: string;
  page: number;
  limit: number;
  options?: number[];
}

export enum ProductStatus {
  DRAFT = 'draft',
  PUBLIC = 'published',
  PRIVATE = 'pending',
}

export enum ProductLabel {
  BESTSELLER = 'BESTSELLER',
  POPULAR = 'POPULAR',
  NEW = 'NEW',
}

export interface Options {
  valueId: number;
  optionId: number;
  price: number;
}

export interface OptionsUpdate {
  productOtionId: number;
  valueId: number;
  optionId: number;
  price: number;
}
