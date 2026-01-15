import styles from "./IncidentListLoadingSkeleton.module.css";

export function IncidentListLoadingSkeleton({ cardCount = 3 }) {
  return (
    <div className={styles.skeleton}>
      {[...Array(cardCount)].map((_, i) => (
        <div key={i} className={styles.skeletonItem}>
          <div className={styles.skeletonTitle} />
          <div className={styles.skeletonMeta} />
        </div>
      ))}
    </div>
  );
}
