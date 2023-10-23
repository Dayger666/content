import * as z from 'zod';

import { userRoles } from '@utils/constants';

export const UserSchema = z.object({
  role: z.nativeEnum(userRoles),
  fullname: z.string(),
  username: z.string(),
  email: z.string().email(),
  dateOfBirth: z.date().max(new Date()),
});

export const UpdateUserSchema = UserSchema.partial().omit({
  email: true,
  role: true,
});

export const CreateUserSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
}).merge(UserSchema.partial().omit({
  username: true,
  email: true,
}));
