export interface City {
  name: string;
  goverrateName: string;
  pricePerKg: number;
  pickupCost: number;
  isActive: boolean;
}
export interface CityDTO {
  id: number;
  name: string;
    goverrateName: string;
  goverrateId: number;
  pricePerKg: number;
  pickupCost: number;
  isActive: boolean;
}
