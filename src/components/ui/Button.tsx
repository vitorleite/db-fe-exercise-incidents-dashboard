import { Button as ButtonPrimitive } from "@base-ui/react/button";
import styles from "./Button.module.css";

interface ButtonProps {
  variant?: "primary";
}

export function Button({ variant = "primary", ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      className={`${styles.button} ${styles[variant]}`}
      {...props}
    />
  );
}
