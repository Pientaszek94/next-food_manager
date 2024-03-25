import styles from "../styles/spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.spinner} aria-label="spinner_icon">
      <div className={styles.spinner_circle}></div>
    </div>
  );
};

export default Spinner;
