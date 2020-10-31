import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from "./TextField.module.scss";

interface TextFieldProps {
  variant?: "textarea" | "shorttext";
  fullWidth?: boolean;
}

type Props = TextFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement> & InputHTMLAttributes<HTMLInputElement>;

const TextField: React.FC<Props> = ({ variant, fullWidth, ...props }) => {
  return variant === "textarea" ? (
    <textarea className={`${styles[fullWidth ? "root__fullWidth" : "root"]} ${props.className}`} {...props} />
  ) : (
    <input className={`${styles[fullWidth ? "root__fullWidth" : "root"]} ${props.className}`} {...props} />
  );
};

TextField.defaultProps = {
  variant: "shorttext",
  fullWidth: false,
};

export default TextField;
