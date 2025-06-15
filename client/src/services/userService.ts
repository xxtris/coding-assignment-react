import { User } from "@acme/shared-models";
import { request } from "./apiClient";

export const userService = {
    getAllUser: () => request<User[]>(`GET`, `/api/users`),
    getUser: (id: number) => request<User>(`GET`, `/api/users/${id}`),
};