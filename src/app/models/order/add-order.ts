import { DeliveryType } from "./delivery-type.enum";
import { OrderStatus } from "./order-status.enum";
import { PaymentType } from "./payment-type.enum";

export interface AddOrderDTO {
  customerName: string;
  email: string;
  phone1: string;
  phone2: string;
  streetAddress: string;

  deliveryType: DeliveryType;
  deliverToVillage: boolean;
  paymentType: PaymentType;
  totalWeight: number;
  totalCost: number;
  notes: string;
  status: OrderStatus;
  createdAt: Date;

  rejectionReasonId?: number;
  governorateId: number;
  cityId: number;
  branchId?: number;
  traderId?: string;
  courierId?: string;
}
