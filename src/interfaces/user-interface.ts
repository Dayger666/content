type UserRole = 'ADMIN' | 'EMPLOYEE';

export interface IUser {
  id: string,
  role: UserRole,
  fullname: string,
  username: string,
  email: string,
  bio: string,
  phone: string,
  dateOfBirth: Date,
  createdAt: Date,
  updatedAt: Date,
}

export interface IUserBodyType {
  role?: UserRole,
  fullname?: string,
  username?: string,
  email?: string,
  bio?: string,
  phone?: string,
}

export interface ICreateUserType extends Partial<IUser> {
  username: IUser['username'],
  email: IUser['email'],
}
