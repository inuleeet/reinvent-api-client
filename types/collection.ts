import type { HttpMethod } from '~/types/http-method';

export type Collection = {
  id: string;
  name: string;
  description: string;
  items: CollectionItem[];
  createdAt: string;
  updatedAt: string;
};

export type CollectionItem = {
  id: string;
  name: string;
  description: string;
  method: HttpMethod;
  createdAt: string;
  updatedAt: string;
};
