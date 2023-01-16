import { ICategoryRequest } from "../../interfaces/categories";
import { IInstructorCreate } from "../../interfaces/instructors";
import { IUserLogin } from "../../interfaces/login";
import { IScheduleRequest } from "../../interfaces/schedules";
import { IUserRequest } from "../../interfaces/user";

export const mockedUser: IUserRequest = {
  name: "Carlos",
  email: "carlos@mail.com",
  age: 18,
  isAdm: false,
  password: "123456",
  contact: 6995225832,
};

export const mockedAdmin: IUserRequest = {
  name: "Lucas",
  email: "lucas@mail.com",
  age: 35,
  isAdm: true,
  password: "123456",
  contact: 1699541832,
};

export const mockedUserLogin: IUserLogin = {
  email: "carlos@mail.com",
  password: "123456",
};

export const mockedAdminLogin: IUserLogin = {
  email: "lucas@mail.com",
  password: "123456",
};

export const mockedInstructor: IInstructorCreate = {
  id: "cc59f0ee-ff71-4379-a690-c1a3b4b02457",
  category: "A",
};

export const mockedInstructor2: IInstructorCreate = {
  id: "cc59f0ee-ff71-4379-a690-c1a3b4b02457",
  category: "B",
};

export const mockedInstructorInvalidCategoryId: IInstructorCreate = {
  id: "cc59f0ee-ff71-4379-a690-c1a3b4b02457",
  category: "A",
};

export const mockedCategory: ICategoryRequest = {
  typeCategorie: "A",
};

export const mockedSchedule: IScheduleRequest = {
  date: "2022/08/12",
  hour: "10:30",
  instructorId: "",
  userId: "",
};

export const mockedScheduleInvalidInstructorId: IScheduleRequest = {
  date: "2022/08/12",
  hour: "10:30",
  instructorId: "b855d86b-d4c9-41cd-ab98-d7fa734c6ce4",
  userId: "",
};
export const mockedScheduleInvalidDate: IScheduleRequest = {
  date: "2022/08/20",
  hour: "10:30",
  instructorId: "",
  userId: "",
};

export const mockedScheduleInvalidHourLess8: IScheduleRequest = {
  date: "2022/08/17",
  hour: "5:30",
  instructorId: "",
  userId: "",
};

export const mockedScheduleInvalidHourMore17: IScheduleRequest = {
  date: "2022/08/17",
  hour: "18:30",
  instructorId: "",
  userId: "",
};
