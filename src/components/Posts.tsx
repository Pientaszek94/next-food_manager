import { useEffect, useState } from "react";
import styles from "../styles/posts.module.scss";
import alterStyles from "../styles/recipes_tiles.module.scss";
import { userInfoInterface } from "../../utils/interfaces";
import { usePathname } from "next/navigation";
import { Post } from ".";

function Posts(props: {
  postsList: any[];
  userInfo?: userInfoInterface | null;
}) {
  const { postsList }: { postsList: any[] } = props;
  const [posts, setPosts] = useState<any[]>([]);
  const pathname = usePathname();
  const [postIndex, setPostIndex] = useState<number>(14);

  useEffect(() => {
    if (postsList) {
      for (let i = 0; i <= 5; i++) {
        setPosts((prevPosts) => prevPosts.concat(postsList[0]));
        setPosts((prevPosts) => prevPosts.concat(postsList[1]));
      }
    }
    if (pathname!.includes("user")) {
      console.log("Pathname user posts", postsList);
    }
  }, [postsList, pathname]);

  const loadMore = () => {
    setPostIndex((prevState) => prevState + 6);
  };

  if (pathname!.includes("home")) {
    return (
      <div className={styles.posts}>
        <div className={styles.grid_posts}>
          <div className={styles.first_row}>
            {posts
              ?.slice(0, 3)
              .map((post, i) => <Post {...props} post={post} key={i} />)}
          </div>
          <div className={styles.second_row}>
            {posts
              ?.slice(4, 7)
              .map((post, i) => <Post {...props} post={post} key={i} />)}
          </div>
        </div>
        <div className={styles.recommand}>
          <span>We also recommand</span>
        </div>
        <div className={styles.other_rows}>
          {posts
            ?.slice(8, postIndex)
            .map((post, i) => <Post {...props} post={post} key={i} />)}
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
      <div className={alterStyles.recipes}>
        {/* {
                    postsList
                    .filter((post)=>{
                        const isIndex=userInfo?.recipes
                                ?.findIndex((recipe:string)=>post.slug==recipe)
                        if(isIndex!=-1){
                            return post
                        }
                    })
                    .map((post, i)=>{
                        
                      return  <Post {...props} post={post} key={i}/>

                    })
                } */}
        {postsList.map((post, i) => (
          <Post {...props} post={post} key={i} />
        ))}
      </div>
    );
  }
}

export default Posts;
