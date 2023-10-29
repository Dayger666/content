export interface IUserLocation {
  id: string;
  userId: string;
  locationId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserLocationBodyType {
  userId?: string;
  locationId?: string;
}
