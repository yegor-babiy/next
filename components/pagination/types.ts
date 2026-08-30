export type PaginagedData<T> = {
  list: T[];
  metadata: {
    count: number;
    hasNextPage: boolean;
    cursor?: {
      id: string;
      createdAt: number;
    };
  };
};
