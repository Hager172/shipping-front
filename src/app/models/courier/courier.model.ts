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
export interface DisplayCourier {
  UserId: string;
  userName: string;
  email: string;
  password: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  discountType: number; // أو string لو هتستخدمي enum كـ نص
  orderShare: number;

  selectedGovernorates: string[]; // أسماء المحافظات
  selectedBranchs: string[];      // أسماء الفروع
}
