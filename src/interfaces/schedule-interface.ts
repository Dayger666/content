export interface ISchedule {
  id: string;
  locationId: string;
  startDate: Date;
  endDate: Date;
  rrule: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IScheduleBodyType {
  locationId?: string;
  startDate?: Date;
  endDate?: Date;
  rrule?: string;
}
