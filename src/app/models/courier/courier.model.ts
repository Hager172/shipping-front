export interface CourierDTO {
  userName: string;
  email: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  password?: string;
  discountType: string;
  orderShare: number;
  selectedGovernorateIds: number[];
  selectedBranchIds: number[];
}
export interface RejectionReason {
  id: number;
  reason: string;
}

export interface DisplayCourier {
  userId: string;
  userName: string;
  email: string;
  password: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  discountType: number; 
  orderShare: number;

  selectedGovernorates: string[]; 
  selectedBranchs: string[];      
}
