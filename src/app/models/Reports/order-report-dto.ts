export interface OrderReportDto {
  id: number;
  customerName: string;
  phone: string;
  traderName: string;
  courierName: string;
  branchName: string;
  governororrateName: string;
  cityName: string;
  statusName: string;
  orderCost: number;
  totalCost: number;
  totalWeight: number;
  createdDate: string;
}

export interface ReportRequestParams {
  PageNumber: number;
  PageSize: number;
  TraderName?: string;
  CourierName?: string;
  BranchName?: string;
  CityName?: string;
  GovernorateName?: string;
  PaymentType?: string;
  Status?: string;
  SearchTerm?: string;
  FromDate?: string;
  ToDate?: string;
}

export interface ReportResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface DropdownOption {
  value: string;
  text: string;
}

export interface TraderDropdownItem {
  id: string;
  fullName: string;
  storeName: string;
  email: string;
}

export interface CourierDropdownItem {
  id: string;
  fullName: string;
  email: string;
}

export interface CityDropdownItem {
  id: number;
  name: string;
  governorrateName: string;
  isActive: boolean;
}

export interface GovernorateDropdownItem {
  id: number;
  name: string;
  isActive: boolean;
}