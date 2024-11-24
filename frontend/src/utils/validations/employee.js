import * as Yup from "yup";

export const employeeSchema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  image: Yup.string().required(),
  mobile: Yup.string().required().min(10),
  designation: Yup.string().oneOf(["HR", "Manager", "Sales"]).required(),
  gender: Yup.string().oneOf(["M", "F"]).required(),
  course: Yup.array(Yup.string()).required().min(1, "course is required field"),
});

export const designationOptions = [
  {
    label: "HR",
    value: "HR",
  },
  {
    label: "Manager",
    value: "Manager",
  },
  {
    label: "Sales",
    value: "Sales",
  },
];

export const genderOptions = [
  {
    label: "Male",
    value: "M",
  },
  {
    label: "Female",
    value: "F",
  },
];

export const courseOptions = [
  {
    label: "B.Sc",
    value: "B.Sc",
  },
  {
    label: "BCA",
    value: "BCA",
  },
  {
    label: "B.Tech",
    value: "B.Tech",
  },
  {
    label: "M.sc",
    value: "M.sc",
  },
  {
    label: "MCA",
    value: "MCA",
  },
  {
    label: "M.Tech",
    value: "M.Tech",
  },
];
