export interface Branch {
  name: string;
  address: string;
  CityId: number;
}
export interface BranchDTO extends Branch {
  id: number;
  cityName: string;
}
