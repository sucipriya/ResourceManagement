export interface IAlert {
  message: string;
  type: "success" | "info" | "warning" | "error" | undefined;
  onClose: () => void;
}
