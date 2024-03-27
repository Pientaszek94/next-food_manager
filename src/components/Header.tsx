"use client";

import { useEffect, useState } from "react";
import styles from "../styles/header.module.scss";
import Logo from "./Logo";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetUserDetailsQuery } from "@/redux/services/authService";
import { logout, setCredentials } from "@/redux/features/authSlice";
import Image from "next/image";
import noprofile from "../../public/no-profile.svg";
import { userInfoInterface } from "../../utils/interfaces";
import { usePathname } from "next/navigation";
function Header() {
  const pathname = usePathname();
  const [position, setPosition] = useState<number>(scrollY);
  const [visible, setVisible] = useState<boolean>(true);
  const { userInfo } = useAppSelector((state) => ({
    userInfo: state.auth.userInfo as userInfoInterface | null,
  }));
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 9000000,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      let moving = scrollY;
      setVisible(position > moving);
      setPosition(moving);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const cls = visible ? styles.visible : styles.hidden;

  return (
    <div className={`${styles.navigation} ${cls} shadow`}>
      <Logo />
      {isFetching ? (
        <div className={styles.profile_menu}>
          <div>Your profile is currently loading...</div>
        </div>
      ) : userInfo !== null ? (
        <div className={styles.profile_menu}>
          <div>
            {userInfo?.image ? (
              <Image
                src={userInfo?.image}
                alt="profile"
                width={40}
                height={40}
              />
            ) : (
              <Image src={noprofile} alt="profile" width={40} height={40} />
            )}
            {userInfo?.name}
          </div>
          <ul>
            {pathname !== "/user-profile" && (
              <li>
                <Link href="/user-profile" className="orange">
                  My Profile
                </Link>
              </li>
            )}
            <li>
              <div className="orange" onClick={() => dispatch(logout())}>
                Logout
              </div>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <Link className={styles.signIn} href="/?registerModal=true">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
