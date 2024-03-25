"use client";
import styles from "./page.module.scss";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "@/apollocms/queries";
import { Posts } from "@/components";
import { useAppSelector } from "@/redux/hooks";
import { userInfoInterface } from "../../../utils/interfaces";
import ModalRecipe from "@/components/ModalRecipe";

export default function Home() {
  const userInfo: userInfoInterface | null = useAppSelector(
    (state) => state.auth.userInfo,
  );
  const postsApi = useQuery(GET_POSTS);
  console.log("postApi", postsApi);
  const posts = postsApi?.data?.posts;

  return (
    <div className={`${styles.home}`}>
      <main>
        <div className={styles.hero}>
          <h1>MINIMUM EFFORT MAXIMUM JOY</h1>
        </div>
        <Posts postsList={posts} userInfo={userInfo} />
        <ModalRecipe postsList={posts} userInfo={userInfo} />
      </main>
    </div>
  );
}
