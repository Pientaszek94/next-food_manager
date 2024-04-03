"use client";
import styles from "../styles/post.module.scss";
import { PostInterface, userInfoInterface } from "../../utils/interfaces";
import { useMutation } from "@apollo/client";
import { UPDATE_POST } from "@/apollocms/mutations";
import {
  usePullUserRecipesMutation,
  usePushUserRecipesMutation,
} from "@/redux/services/authService";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { pullRecipe, pushRecipe } from "@/redux/features/authSlice";

function Post(props: {
  post: PostInterface;
  key: number | any;
  postsList: PostInterface[];
  userInfo?: userInfoInterface | null | undefined;
}) {
  const [updatePost] = useMutation(UPDATE_POST);
  const [pushUserRecipes] = usePushUserRecipesMutation();
  const [pullUserRecipes] = usePullUserRecipesMutation();
  const dispatch = useDispatch();
  const { userInfo, post } = props;
  const pathname = usePathname();
  const router = useRouter();

  const navigateToRecipe = () => {
    router.push(`${pathname}?recipe=${post.slug}`);
  };

  const updatePostsLikes = async () => {
    let postsLikes = post?.likes;
    const indexRecipe = userInfo!.recipes.findIndex(
      (recipe: string) => recipe == post.slug,
    );
    if (indexRecipe == -1) {
      ++postsLikes;
      await pushUserRecipes({ recipes: post.slug })
        .unwrap()
        .then(() => {
          dispatch(pushRecipe(post.slug));
          updatePost({ variables: { likes: postsLikes, id: post.id } });
        });
    } else {
      --postsLikes;
      await pullUserRecipes({ recipes: post.slug })
        .unwrap()
        .then(() => {
          dispatch(pullRecipe(post.slug));
          updatePost({ variables: { likes: postsLikes, id: post.id } });
        });
    }
  };

  return (
    <div className={styles.post}>
      {userInfo && (
        <h4
          className={`${styles.heart} ${userInfo?.recipes?.findIndex((recipe: string) => recipe == post.slug) != -1 ? "orange-txt" : ""}`}
          onClick={updatePostsLikes}
        >
          <span className="material-symbols-outlined">favorite</span>
        </h4>
      )}

      <h4 className={styles.timer}>
        <span className="material-symbols-outlined">timer</span>
        {" " + post.cookingTime + " mins"}
      </h4>
      <div
        style={{
          backgroundImage: `url(${post.foodImages[0]?.url})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className={styles.blacken} onClick={navigateToRecipe} />
      </div>

      <h5 className={styles.post__title} onClick={navigateToRecipe}>
        {post.title.toUpperCase()}
      </h5>
    </div>
  );
}

export default Post;
