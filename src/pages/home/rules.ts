import { Rule, RuleObject } from "antd/lib/form";

export const firstNameRules: Rule[] = [
  { required: true, message: "First name is required" },
  { min: 6, message: "First name must be at least 6 characters long" },
  { max: 10, message: "First name cannot be longer than 10 characters" },
];

export const lastNameRules: Rule[] = [
  { required: true, message: "Last name is required" },
  { min: 6, message: "Last name must be at least 6 characters long" },
  { max: 10, message: "Last name cannot be longer than 10 characters" },
];

export const emailRules: Rule[] = [
  { required: true, message: "Email is required" },
  { type: "email", message: "Please enter a valid email" },
];

export const genderRules: Rule[] = [
  { required: true, message: "Please select an gender option!" },
];

const validateMobileNumber = (
  rule: RuleObject,
  value: any,
  callback: Function
) => {
  if (!value) {
    callback();
  } else {
    const pattern = /^[689]\d{7}$/; // Regex pattern to match an 8-digit Singapore mobile number
    if (!pattern.test(value)) {
      callback("Please enter a valid 8-digit Singapore mobile number");
    } else {
      callback();
    }
  }
};

export const phoneRules: Rule[] = [
  {
    required: true,
    message: "Please enter your mobile number",
  },
  {
    validator: validateMobileNumber,
  },
];
