import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./input.module.scss";

interface FieldProps {
  id: string;
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  isDisabled?: boolean;
  error?: string;
  registration?: UseFormRegisterReturn;
}

const FormInput: React.FC<FieldProps> = ({
  id,
  name,
  label,
  placeholder,
  type = "text",
  className,
  isDisabled,
  error,
  registration,
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={isDisabled}
        className={`${styles.input} ${error ? styles.error : ""}`}
        {...registration}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default FormInput;
