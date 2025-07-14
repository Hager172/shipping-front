export interface RegisterEmployeeDTO {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  address?: string;
  branchIds: number[];
  safeIds: number[];
  permissionActionIds?: number[];
}
export interface EmployeeWithPermissions {
  userId: string;
  userName: string;
  fullName: string;
  email: string;
  address: string;
  isActive: boolean;
  permissions: string[];
    branchIds: number[]; 
  safeIds: number[];  
}
export interface PermissionDTO {
  id: number;
  name: string;
  description?: string;
}
export interface CheckPermissionDto {
  userId: string;
  permissionName: string;
  actionTypeId: number;
}