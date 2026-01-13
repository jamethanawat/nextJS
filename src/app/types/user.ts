export type UserStatus = "active" | "inactive";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role?: string;
  status?: UserStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type UserPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role?: string;
  status?: UserStatus;
};