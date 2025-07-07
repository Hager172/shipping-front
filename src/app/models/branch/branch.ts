export interface Branch {
  name: string;
  address: string;
  cityId: number;
}
export interface BranchDTO extends Branch {
  id: number;
}
