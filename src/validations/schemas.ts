import * as yup from "yup";
import { IUserRequest } from "../interfaces/user";
import { SchemaOf } from "yup";

export const userWithoutPasswordValidation: SchemaOf<IUserRequest> = yup
  .object()
  .shape({
    id: yup.string().notRequired(),
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    contact: yup.number().notRequired(),
    age: yup.number().notRequired(),
    cpf: yup.string().notRequired(),
    isAdm: yup.boolean().notRequired(),
    isActive: yup.boolean().notRequired(),
    typeCategorie: yup.string().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
  });
