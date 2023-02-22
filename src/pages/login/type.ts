export interface UserResponse {
  userName: string;
  password: string;
  profileName: string;
  role: any;
}

export interface UsersRequest {
  userName: string;
  password: string;
}

export type GetUsersResponse = UserResponse[];
