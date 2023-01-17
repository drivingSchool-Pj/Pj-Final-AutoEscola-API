import { ICategoryRequest } from "../../interfaces/categories";
import { IInstructorCreate } from "../../interfaces/instructors";
import { IUserLogin } from "../../interfaces/login";
import { IScheduleRequest } from "../../interfaces/schedules";
import {
  IUserRequest,
  IUserUpdate,
} from "../../interfaces/user/user.interface";

export const mockedUser: IUserRequest = {
  name: "Ronaldinho Gauchos",
  email: "ronaldinho2@gmail.com",
  contact: "8878",
  password: "1234",
  age: 42,
  cpf: "53637314444",
  isAdm: false,
  typeCategorie: "A",
  address: {
    street: "São Joaquim",
    complement: "Perto da padaria",
    number: "5",
    city: "Osasco",
    state: "SP",
  },
};

export const invalidMockedUser: IUserRequest = {
  name: "",
  email: "ronaldinho2@gmail.com",
  contact: "8878",
  password: "1234",
  age: 42,
  cpf: "53637314444",
  isAdm: false,
  typeCategorie: "A",
  address: {
    street: "São Joaquim",
    complement: "Perto da padaria",
    number: "5",
    city: "Osasco",
    state: "SP",
  },
};

export const mockedAdmin: IUserRequest = {
  name: "João Pereira",
  email: "joaopereira@gmail.com",
  contact: "1191452-1758",
  password: "1234",
  age: 42,
  cpf: "53637314444",
  isAdm: true,
  typeCategorie: "A",
  address: {
    street: "São Joaquim",
    complement: "Perto da padaria",
    number: "5",
    city: "Osasco",
    state: "SP",
  },
};

export const mockedAdminUpdate: IUserUpdate = {
  email: "joaopereira2020@gmail.com",
};

export const mockedUserLogin: IUserLogin = {
  email: "ronaldinho2@gmail.com",
  password: "1234",
};

export const mockedAdminLogin: IUserLogin = {
  email: "joaopereira@gmail.com",
  password: "1234",
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
