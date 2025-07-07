export interface RegisterDTO {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  fullName?: string;
  address?: string;
  role?: string;
}
