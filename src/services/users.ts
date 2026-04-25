import { User } from "@/types";

const API_URL = "https://5981ea7a-fc03-4874-bea1-062204d02025.mock.pstmn.io/api/users";

export const getUsersTableData = async (): Promise<User[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
};

export const saveUserToLocalStorage = (user: User): void => {
  localStorage.setItem(`user_${user.id}`, JSON.stringify(user));
};

export const getUserDetails = async (id: string): Promise<User> => {
  const rawData = localStorage.getItem(`user_${id}`);
  if (!rawData) throw new Error("No data found");
  return JSON.parse(rawData);
};
