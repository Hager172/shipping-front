export interface Bank {
  id: number;
  name: string;
  branchName: string;
  balance: number;
  createdDate: string; // string أو Date لو هتعملي فورمات
  isActive: boolean;
  branchId: number;
}
