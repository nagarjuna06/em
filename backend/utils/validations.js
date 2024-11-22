import * as yup from "yup";

export const employeeSchema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    image: yup.string().required(),
    mobile: yup.string().required(),
    designation: yup.string().oneOf(["HR", "Manager", "Sales"]).required(),
    gender: yup.string().oneOf(["M", "F"]).required(),
    course: yup.string().required(),
  })
  .noUnknown(true);

export const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});
