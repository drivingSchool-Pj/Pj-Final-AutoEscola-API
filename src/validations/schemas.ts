import * as yup from "yup";
import { IUserRequest } from "../interfaces/user";
import { SchemaOf } from "yup";

export const userWithoutPasswordValidation: SchemaOf<IUserRequest> = yup
  .object()
  .shape({
    id: yup.string().notRequired(),
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    contact: yup.string().notRequired(),
    age: yup.number().notRequired(),
    cpf: yup.string().notRequired(),
    isAdm: yup.boolean().notRequired(),
    isActive: yup.boolean().notRequired(),
    typeCategorie: yup.string().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
  });

export const userRegisterValidation: any = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  contact: yup.string().required(),
  password: yup.string().required(),
  age: yup.number().required(),
  cpf: yup.string().required(),
  isAdm: yup.boolean().notRequired(),
  typeCategorie: yup.string().required(),
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
