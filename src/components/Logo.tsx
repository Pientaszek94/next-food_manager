import Link from "next/link";
import { logoStyles } from "@/styles";
function Logo() {
  return (
    <Link href="/home" className={`${logoStyles.logo}`}>
      <span>FOOD</span>
      <p>MANAGER</p>
    </Link>
  );
}

export default Logo;
