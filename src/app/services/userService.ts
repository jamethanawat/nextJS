import {
  mockCreateUser,
  mockDeleteUser,
  mockFetchUserById,
  mockFetchUsers,
  mockUpdateUser,
} from "@/app/services/mockApi";
import * as userApi from "@/app/services/api/userApi";
import type { User, UserPayload } from "@/app/types/user";

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS !== "false";

export async function fetchUsers(): Promise<User[]> {
  if (USE_MOCKS) {
    return mockFetchUsers();
  }
  return userApi.getUsers();
}

export async function fetchUserById(id: string): Promise<User> {
  if (USE_MOCKS) {
    return mockFetchUserById(id);
  }
  return userApi.getUserById(id);
}

export async function createUser(payload: UserPayload): Promise<User> {
  if (USE_MOCKS) {
    return mockCreateUser(payload);
  }
  return userApi.createUser(payload);
}

export async function updateUser(id: string, payload: UserPayload): Promise<User> {
  if (USE_MOCKS) {
    return mockUpdateUser(id, payload);
  }
  return userApi.updateUser(id, payload);
}

export async function deleteUser(id: string): Promise<void> {
  if (USE_MOCKS) {
    await mockDeleteUser(id);
    return;
  }
  await userApi.deleteUser(id);
}
