"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import noprofile from "../../public/no-profile.svg";
import { headerStyles } from "@/styles";
import { userInfoInterface } from "../../utils/interfaces";
import Logo from "./Logo";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetUserDetailsQuery } from "@/redux/services/authService";
import { logout, setCredentials } from "@/redux/features/authSlice";
import { usePathname } from "next/navigation";
function Header() {
  const pathname = usePathname();
  const [position, setPosition] = useState(scrollY);
  const [visible, setVisible] = useState(true);
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

  const cls = visible ? headerStyles.visible : headerStyles.hidden;

  return (
    <div className={`${headerStyles.navigation} ${cls} shadow`}>
      <Logo />
      {isFetching ? (
        <div className={headerStyles.profile_menu}>
          <div>Your profile is currently loading...</div>
        </div>
      ) : userInfo !== null ? (
        <div className={headerStyles.profile_menu}>
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
          <Link className={headerStyles.signIn} href="/?registerModal=true">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
