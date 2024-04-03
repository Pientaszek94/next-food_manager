import { CookieValueTypes } from "cookies-next";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export interface AuthStateInterface {
  loading: false | true;
  userInfo: userInfoInterface | null;
  userToken: CookieValueTypes | null;
  error: null | any;
  success: boolean;
}
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

export interface PostInterface {
  content: RichTextInterface;
  cookingTime: number;
  date: Date;
  description: string;
  foodImages: {
    url: string;
    __typename: "Asset";
  }[];
  id: string;
  likes: number;
  portions: number;
  premium: boolean;
  productList: RichTextInterface;
  refProduct: RefProductInterface[];
  slug: string;
  title: string;
  __typename: "Post";
}

export interface RichTextInterface {
  html: string;
  __typename: "RichText";
}

export interface RefProductInterface {
  productName: string;
  slug: string;
  __typename: "Product";
}
