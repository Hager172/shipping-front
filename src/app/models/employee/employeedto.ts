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
