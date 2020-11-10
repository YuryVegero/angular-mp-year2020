export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  email: string;
  token: string;
}
