import styles from "../styles/footer.module.scss";
function Footer() {
  const food =
    "https://www.wallpapers.net/free-download-assorted-food-hd-wallpaper-for-desktop-mobiles/download/5120x2160.jpg";
  return (
    <div className={styles.footer}>
      <div className={styles.footer__image} />
      <h1 className={styles.footer__designer}>PWL Frontdev</h1>
      <h5 className={styles.footer__motto}>
        Made with curiousity and a itsy bitsy fun
      </h5>
    </div>
  );
}

export default Footer;
