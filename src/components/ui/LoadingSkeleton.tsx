import styles from "./LoadingSkeleton.module.css";

interface LoadingSkeletonProps {
  count?: number;
  size?: "small" | "medium" | "large";
  width?: string;
  margin?: "sm" | "md" | "lg";
}

export function LoadingSkeleton({
  count = 1,
  size = "medium",
  width = "80%",
  margin = "md",
}: LoadingSkeletonProps) {
  const cssStyle = {
    "--width": width,
  } as React.CSSProperties;
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          style={cssStyle}
          className={`${styles.loadingSkeleton} ${styles[size]} ${styles[margin]}`}
          data-testid="loading-skeleton"
        />
      ))}
    </>
  );
}
