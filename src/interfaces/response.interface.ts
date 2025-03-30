export interface ResponseAttributes {
    code: number;
    message?: string;
  }

export interface ResponseResultsOneObject<T> extends ResponseAttributes {
    results: T;
  }

export interface ResponseResultsArray<T> extends ResponseAttributes {
    results: T[];
  }


export interface ResponseResultsPagination<T> extends ResponseResultsArray<T> {
    totalItems: number;
    totalPages: number;
  }

export interface ResponseResultsPagination<T> extends ResponseResultsArray<T> {
    totalItems: number;
    totalPages: number;
  }