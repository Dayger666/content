type UserRole = 'ADMIN' | 'EMPLOYEE';

export interface IUser {
  id: string;
  role: UserRole;
  fullname: string;
  username: string;
  email: string;
  position?: string;
  dateOfBirth?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserBodyType {
  role?: UserRole;
  fullname?: string;
  username?: string;
  email?: string;
  position?: string;
  dateOfBirth?: Date;
}

export interface ICreateUserType extends Partial<IUser> {
  username: IUser['username'];
  email: IUser['email'];
}
