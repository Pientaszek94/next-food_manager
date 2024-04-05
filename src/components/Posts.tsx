import { useEffect, useState } from "react";
import { postsStyles, recipesTilesStyles } from "@/styles";
import { PostInterface, userInfoInterface } from "../../utils/interfaces";
import { usePathname } from "next/navigation";
import { Post } from ".";

function Posts(props: {
  postsList: PostInterface[];
  userInfo?: userInfoInterface | null;
}) {
  const { postsList } = props;
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const pathname = usePathname();
  const [postIndex, setPostIndex] = useState<number>(14);

  useEffect(() => {
    if (postsList) {
      for (let i = 0; i <= 5; i++) {
        setPosts((prevPosts) => prevPosts.concat(postsList[0]));
        setPosts((prevPosts) => prevPosts.concat(postsList[1]));
      }
    }
  }, [postsList, pathname]);

  const loadMore = () => {
    setPostIndex((prevState) => prevState + 6);
  };

  if (pathname!.includes("home")) {
    return (
      <div className={postsStyles.posts}>
        <div className={postsStyles.grid_posts}>
          <div className={postsStyles.first_row}>
            {posts
              ?.slice(0, 3)
              .map((post: PostInterface, i) => (
                <Post {...props} post={post} key={i} />
              ))}
          </div>
          <div className={postsStyles.second_row}>
            {posts
              ?.slice(4, 7)
              .map((post: PostInterface, i) => (
                <Post {...props} post={post} key={i} />
              ))}
          </div>
        </div>
        <div className={postsStyles.recommand}>
          <span>We also recommand</span>
        </div>
        <div className={postsStyles.other_rows}>
          {posts
            ?.slice(8, postIndex)
            .map((post: PostInterface, i) => (
              <Post {...props} post={post} key={i} />
            ))}
        </div>
        {postIndex <= posts.length && (
          <button className="button large orange" onClick={loadMore}>
            Load more
          </button>
        )}
      </div>
    );
  } else {
    return (
      <div className={recipesTilesStyles.recipes}>
        {postsList.map((post: PostInterface) => (
          <Post {...props} post={post} key={post.slug} />
        ))}
      </div>
    );
  }
}

export default Posts;
