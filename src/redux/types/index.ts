type userDetailsType = {
  userName: string;
  password: string;
  profileName: string;
  role: string[];
};

type employeeDetailsType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  joinedDate: null | string;
};

export type HomeInitialStateType = {
  userDetails: userDetailsType[];
  employeeDetails: employeeDetailsType[];
};
