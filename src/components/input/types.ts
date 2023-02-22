export interface IInput {
  label?: string;
  name?: string;
  placeholder?: string;
  rules?: any[];
  type?: string;
  items?: string[];
  validateTrigger?: string[];
  prefix?: any;
  onChange?: () => void;
  allowClear?: boolean;
}
