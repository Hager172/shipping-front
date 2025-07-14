export interface AdminDashboardStats {
  newOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
  deliveredToRepresentativeOrders: number;
  unreachableOrders: number;
  postponedOrders: number;
  partiallyDeliveredOrders: number;
  cancelledByUserOrders: number;
  rejectedWithPaymentOrders: number;
  rejectedWithPartialPaymentOrders: number;
  rejectedWithoutPaymentOrders: number;
  totalRevenue: number;
  totalCost: number;
}
