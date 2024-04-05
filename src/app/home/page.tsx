"use client";
import { homePageStyles } from "@/styles";
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
  const posts = postsApi?.data?.posts;

  return (
    <div className={homePageStyles.home}>
      <main>
        <div className={homePageStyles.hero}>
          <h1>MINIMUM EFFORT MAXIMUM JOY</h1>
        </div>
        <Posts postsList={posts} userInfo={userInfo} />
        <ModalRecipe postsList={posts} />
      </main>
    </div>
  );
}
