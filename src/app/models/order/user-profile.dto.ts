export interface UserProfileDTO {
  userName: string;
  email: string;
  fullName: string;
  address?: string;
  role: string;
  token: string;
  tokenExpiration: Date;
  Role?:string;
}
