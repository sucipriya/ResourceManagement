import dayjs from "dayjs";
export const columns = [
  {
    title: "First name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Last name",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "Email address",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Joining date",
    dataIndex: "joinedDate",
    key: "joinedDate",
  },
];

export const intialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  joinedDate: dayjs(new Date()),
};
