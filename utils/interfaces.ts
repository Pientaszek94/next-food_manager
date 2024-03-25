import { CookieValueTypes } from "cookies-next";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export interface AuthStateInterface {
  loading: false | true;
  userInfo: userInfoInterface | null;
  userToken: CookieValueTypes | null;
  error: null | any;
  success: boolean;
}
// userToken: RequestCookie | undefined
export interface userInfoInterface {
  active: boolean | null;
  desc?: string | null;
  email: string | null;
  image?: string | null;
  name: string | null;
  recipes?: any;
  token?: string | null;
  _id: string | null;
}
export interface RegisteringUserInterface {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
