import styles from "../styles/user_dialog.module.scss";

function Dialog({
  dialogRef,
  children,
}: {
  dialogRef: any;
  children: React.ReactNode;
}) {
  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dialogRef.current.close();
  };

  return (
    <dialog id="dialog" className={styles.user_dialog} ref={dialogRef}>
      <button className="small-btn cross" onClick={closeModal}>
        <span className="material-symbols-outlined">add</span>
      </button>
      {children}
    </dialog>
  );
}

export default Dialog;
