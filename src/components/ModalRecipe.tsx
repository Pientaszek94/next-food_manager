"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { mRecipesStyles } from "@/styles";
import Logo from "./Logo";
import RecipePreviewSLider from "./styled/RecipePreviewSlider";
import { RecipeSlider } from "./styled";

function ModalRecipe({ postsList }: { postsList: any[] }) {
  const recipe = useSearchParams()!.get("recipe");
  const pathname = usePathname();
  const router = useRouter();
  const [checkedIndex, setCheckedIndex] = useState<number | null>();
  const [currentRecipe, setCurrentRecipe] = useState<number | null>();

  useEffect(() => {
    setCurrentRecipe(postsList?.findIndex((obj) => obj.slug == recipe));
    setCheckedIndex(postsList?.findIndex((obj) => obj.slug == recipe));
  }, [recipe, postsList]);

  const nextRecipe = () => {
    router.push(pathname + "?recipe=" + postsList[currentRecipe! + 1]?.slug);
  };

  const prevRecipe = () => {
    if (currentRecipe == 0) {
    }
    router.push(pathname + "?recipe=" + postsList[currentRecipe! - 1]?.slug);
  };

  const checkNext = () => {
    setCheckedIndex((prevState) => prevState! + 1);
  };
  const checkPrev = () => {
    setCheckedIndex((prevState) => prevState! - 1);
  };

  if (recipe) {
    return (
      <div className={mRecipesStyles.modal_recipes}>
        <header className={mRecipesStyles.head}>
          <Logo />
          <button
            className="orange"
            onMouseEnter={() => (currentRecipe! > 0 ? checkPrev() : null)}
            onMouseLeave={() => (currentRecipe! > 0 ? checkNext() : null)}
            onClick={prevRecipe}
            disabled={currentRecipe == 0}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className={mRecipesStyles.recipe_previews_container}>
            <RecipePreviewSLider
              $postsLength={postsList?.length}
              $checkedIndex={checkedIndex}
            >
              {postsList?.map((recipe: any) => (
                <div className={mRecipesStyles.slides} key={recipe.id}>
                  <h4 className={mRecipesStyles.recipe__title}>
                    {recipe?.title.toUpperCase()}
                  </h4>
                </div>
              ))}
            </RecipePreviewSLider>
          </div>
          <button
            className="orange"
            onMouseEnter={() =>
              currentRecipe! >= postsList?.length - 1 ? null : checkNext()
            }
            onMouseLeave={() =>
              currentRecipe! >= postsList?.length - 1 ? null : checkPrev()
            }
            onClick={nextRecipe}
            disabled={currentRecipe! >= postsList?.length - 1}
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <button
            className={mRecipesStyles.transp_bg}
            onClick={() => router.push(pathname!)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>
        <div className={mRecipesStyles.recipe__grid}>
          <div className={mRecipesStyles.image__carousel}>
            <RecipeSlider
              $postsLength={postsList?.length}
              $currentRecipe={currentRecipe}
            >
              {postsList?.map((recipe) => (
                <div
                  className={mRecipesStyles.slides}
                  key={recipe.id}
                  style={{
                    backgroundImage: `url(${recipe.foodImages[0]?.url})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></div>
              ))}
            </RecipeSlider>
          </div>
          <div className={mRecipesStyles.recipes__carousel}>
            <RecipeSlider
              $postsLength={postsList?.length}
              $currentRecipe={currentRecipe}
            >
              {postsList?.map((recipe) => (
                <div className={mRecipesStyles.slides} key={recipe.id}>
                  <div className={mRecipesStyles.info_recipe}>
                    <h4 className={mRecipesStyles.recipe__favorite}>
                      <span className="material-symbols-outlined">
                        favorite
                      </span>
                      {" " + recipe.likes}
                    </h4>
                    <h4 className={mRecipesStyles.timer}>
                      <span className="material-symbols-outlined">timer</span>
                      {" " + recipe.cookingTime + " mins"}
                    </h4>
                    <h4 className={mRecipesStyles.portions}>
                      <span className="material-symbols-outlined">
                        safety_divider
                      </span>
                      {" " + recipe.portions}
                    </h4>
                  </div>
                  <div className={mRecipesStyles.description_recipe}>
                    <div>
                      <h2 className={mRecipesStyles.initials}>FM</h2>
                    </div>
                    <h4 className={mRecipesStyles.description__text}>
                      {recipe.description}
                    </h4>
                  </div>
                  <div className={mRecipesStyles.recipe_list_steps}>
                    <div className={mRecipesStyles.recipe_list}>
                      <h3 className={mRecipesStyles.content__title}>
                        Ingredients
                      </h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: recipe.productList.html,
                        }}
                      />
                    </div>

                    <div className={mRecipesStyles.recipe__steps}>
                      <h3 className={mRecipesStyles.content__title}>
                        Recipes Steps
                      </h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: recipe.content.html,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </RecipeSlider>
          </div>
        </div>
      </div>
    );
  } else {
    return;
  }
}

export default ModalRecipe;
