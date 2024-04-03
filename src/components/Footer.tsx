import { footerStyles } from "@/styles";
footerStyles;
function Footer() {
  const food =
    "https://www.wallpapers.net/free-download-assorted-food-hd-wallpaper-for-desktop-mobiles/download/5120x2160.jpg";
  return (
    <div className={footerStyles.footer}>
      <div className={footerStyles.footer__image} />
      <h1 className={footerStyles.footer__designer}>PWL Frontdev</h1>
      <h5 className={footerStyles.footer__motto}>
        Made with curiousity and a itsy bitsy fun
      </h5>
    </div>
  );
}

export default Footer;
