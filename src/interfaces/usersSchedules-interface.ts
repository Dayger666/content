export interface IUserSchedule {
  id: string;
  userId: string;
  scheduleId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserScheduleBodyType {
  userId?: string;
  scheduleId?: string;
}
