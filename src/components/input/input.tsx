import { Form, Input, Radio } from "antd";
import { IInput } from "./types";

const InputField = ({
  label,
  name,
  rules,
  placeholder,
  validateTrigger,
  prefix,
  type = "text",
  onChange,
  items,
  allowClear,
}: IInput) => {
  if (type === "radio") {
    return (
      <Form.Item label={label} name={name} rules={rules}>
        <Radio.Group>
          {items?.map((item: string) => {
            return (
              <Radio
                value={item}
                style={{ textTransform: "capitalize" }}
                key={item}
              >
                {item}
              </Radio>
            );
          })}
        </Radio.Group>
      </Form.Item>
    );
  } else if (type === "password") {
    return (
      <Form.Item
        label={label}
        name={name}
        rules={rules}
        validateTrigger={validateTrigger}
      >
        <Input.Password
          placeholder={placeholder}
          prefix={prefix}
          onChange={onChange}
        />
      </Form.Item>
    );
  } else {
    return (
      <Form.Item
        label={label}
        name={name}
        rules={rules}
        validateTrigger={validateTrigger}
      >
        <Input
          placeholder={placeholder}
          prefix={prefix}
          onChange={onChange}
          allowClear={allowClear}
        />
      </Form.Item>
    );
  }
};

export default InputField;
