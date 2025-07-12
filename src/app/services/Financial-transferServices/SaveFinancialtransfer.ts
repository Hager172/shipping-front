// models/Financial-transfer/SaveFinancialtransfer.ts
export interface SaveFinancialTransfer {
  sourceBankId?: number;
  sourceSafeId?: number;
  destinationBankId?: number;
  destinationSafeId?: number;
  amount: number;
  note?: string;
}
