import { spinnerStyles } from "@/styles";

const Spinner = () => {
  return (
    <div className={spinnerStyles.spinner} aria-label="spinner_icon">
      <div className={spinnerStyles.spinner_circle}></div>
    </div>
  );
};

export default Spinner;
