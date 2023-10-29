export interface ILocation {
  id: string;
  name: string;
  address: string;
  adminId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILocationBodyType {
  name: string;
  address: string;
  adminId: string;
}
