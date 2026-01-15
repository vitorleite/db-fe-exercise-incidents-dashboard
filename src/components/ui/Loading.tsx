import styles from "./Loading.module.css";

export function Loading() {
  return (
    <div className={styles.loading} data-testid="loading">
      Loading...
    </div>
  );
}
