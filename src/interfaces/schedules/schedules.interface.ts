export interface IScheduleRequest {
  date: string;
  hour: string;
  instructorsId: string;
  userId: string;
  locationId: string;
}

export interface ISchedulesListResponse {
  id: string;
  date: string;
  hour: string;
  instructors: string;
  user: string;
  location: string;
}
