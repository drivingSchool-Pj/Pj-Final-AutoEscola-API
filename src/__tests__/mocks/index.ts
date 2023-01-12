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

export const mockedInstructor = {
  name: "Pedro Furtado",
  categoryId: "",
};
export const mockedInstructor2 = {
  name: "Carlos José",
  categoryId: "",
};

export const mockedInstructorInvalidCategoryId = {
  name: "Pedro Furtado",
  categoryId: "8f9ae6ce-e36c-4d9d-9bd7-b4c98cb4e4f4",
};

export const mockedCategory = {
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
