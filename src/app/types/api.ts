export type APIResponse<T> = {
  status: number;
  success: boolean;
  data: T;
};