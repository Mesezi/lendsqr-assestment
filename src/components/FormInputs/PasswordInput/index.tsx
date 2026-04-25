import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./passwordInput.module.scss";

interface FieldProps {
  id: string;
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  isDisabled?: boolean;
  error?: string;
  registration?: UseFormRegisterReturn;
}

const PasswordInput: React.FC<FieldProps> = ({
  id,
  name,
  label,
  placeholder,
  className,
  isDisabled,
  error,
  registration,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`${styles.container} ${className}`}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.root}>
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          disabled={isDisabled}
          className={`${styles.input} ${error ? styles.error : ""}`}
          {...registration}
        />
        <span className={styles.show} onClick={() => setShowPassword((p) => !p)}>
          {showPassword ? "HIDE" : "SHOW"}
        </span>
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default PasswordInput;
