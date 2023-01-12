import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequest } from "../interfaces/user/user.interface";

export const userWithoutPasswordValidation: any = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  contact: yup.string().notRequired(),
  age: yup.number().notRequired(),
  cpf: yup.string().notRequired(),
  isAdm: yup.boolean().notRequired(),
  isActive: yup.boolean().notRequired(),
  typeCategorie: yup.string().notRequired(),
  address: yup.object({
    id: yup.string().notRequired(),
    street: yup.string().notRequired(),
    complement: yup.string().notRequired(),
    number: yup.string().notRequired(),
    city: yup.string().notRequired(),
    state: yup.string().notRequired(),
  }),
  createdAt: yup.date().notRequired(),
  updatedAt: yup.date().notRequired(),
});

export const listUserWithoutPasswordValidation: SchemaOf<IUserRequest[]> =
  yup.array(userWithoutPasswordValidation);

export const userRegisterValidation: any = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  contact: yup.string().required(),
  password: yup.string().required(),
  age: yup.number().required(),
  cpf: yup.string().required(),
  isAdm: yup.boolean().notRequired(),
  typeCategorie: yup
    .string()
    .required()
    .matches(
      /(?=.*[A-E])/gi,
      "The driving license type is invalid. Type a letter from A - E"
    ),
  address: yup.object({
    street: yup.string().required("field street is required"),
    complement: yup.string().required("field complement is required"),
    number: yup.string().required("field number is required"),
    city: yup.string().required("field city is required"),
    state: yup
      .string()
      .max(2, "Invalid state")
      .required("field state is required"),
  }),
});

export const updateUser = yup.object().shape({
  id: yup.string(),
  name: yup.string(),
  email: yup.string().email(),
  age: yup.number(),
  typeCategorie: yup.string(),
  isAdm: yup.boolean(),
  isActive: yup.boolean(),
});

export const Schedules = yup.object().shape({
  date: yup.string().required(),
  hour: yup.string().required(),
  instructorsId: yup.string().required(),
  userId: yup.string().required(),
  locationId: yup.string().required(),
});
