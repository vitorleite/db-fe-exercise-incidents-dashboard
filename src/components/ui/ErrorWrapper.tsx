import styles from "./ErrorWrapper.module.css";

interface ErrorWrapperProps {
  children: React.ReactNode;
}

export function ErrorWrapper({ children }: ErrorWrapperProps) {
  return <div className={styles.errorWrapper}>{children}</div>;
}
