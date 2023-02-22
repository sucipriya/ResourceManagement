import { Rule } from "antd/lib/form";

export const loginRule: Rule[] = [
  { required: true, message: "Please input your Username!" },
];

export const passwordRule: Rule[] = [
  { required: true, message: "Please input your Password!" },
];
