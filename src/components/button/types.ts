export type ButtonTypes = {
  type?:
    | "primary"
    | "link"
    | "text"
    | "ghost"
    | "default"
    | "dashed"
    | undefined;
  label?: string;
  htmlType?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  iconComp?: any;
  danger?: boolean;
  loading?: boolean;
};
