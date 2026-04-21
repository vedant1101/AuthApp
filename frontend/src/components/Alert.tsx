interface Props {
    type:    "success" | "error";
    message: string;
  }
  
  export function Alert({ type, message }: Props) {
    return <div className={`alert alert--${type}`}>{message}</div>;
  }