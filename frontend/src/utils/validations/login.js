// import {z as Zod} from 'zod'

// const loginSchema = Zod.object({
//     username:Zod.string().min(1,'username is required')
// })

import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});
