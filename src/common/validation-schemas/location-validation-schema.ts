import * as z from 'zod';

export const LocationSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  address: z.string(),
  adminId: z.string().uuid(),
});

export const CreateLocationSchema = LocationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateLocationSchema = LocationSchema.partial();
