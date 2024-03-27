"use client";
import { GET_POSTS } from "@/apollocms/queries";
import Profile from "@/components/Profile";
import Spinner from "@/components/Spinner";
import { LoadingScreen } from "@/components/styled";
import { useAppSelector } from "@/redux/hooks";
import { useGetUserDetailsQuery } from "@/redux/services/authService";
import { useQuery } from "@apollo/client";
import React from "react";

function UserProfile() {
  const userInfo = useAppSelector(({ auth }) => auth.userInfo);
  const { isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 9000000,
  });
  const postsApi = useQuery(GET_POSTS);
  const posts = postsApi?.data?.posts;
  console.log("POst", postsApi);

  if (!isFetching) {
    if (userInfo !== null && userInfo.active) {
      return (
        <Profile
          userInfo={userInfo}
          postsList={posts?.filter((post: any) => {
            const isIndex = userInfo?.recipes?.findIndex(
              (recipe: string) => post.slug == recipe,
            );
            if (isIndex != -1) {
              return post;
            }
          })}
        />
      );
    } else {
      return <div>Not Auth</div>;
    }
  } else {
    return (
      <LoadingScreen>
        <Spinner />
      </LoadingScreen>
    );
  }
}

export default UserProfile;
