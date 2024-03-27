import { useState } from "react";
import styles from "../styles/favourites.module.scss";
import Posts from "./Posts";
import { ButtonFavourites, SlideFavourites, SliderFavourites } from "./styled";

function Favourites(props: any) {
  const { postsList } = props;
  const [categoryIndex, setCategoryIndex] = useState(0);
  const categories = ["recipes", "tips"];

  return (
    <div className={styles.favourites}>
      {categories.map((category, index) => (
        <ButtonFavourites
          key={index}
          $buttonIndex={index}
          $categoryIndex={categoryIndex}
          onClick={() => setCategoryIndex(index)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </ButtonFavourites>
      ))}
      <div className={styles.favourites__carousel_container}>
        <SliderFavourites $categoryIndex={categoryIndex}>
          {categories.map((key, index) => (
            <SlideFavourites
              key={index}
              $index={index}
              $categoryIndex={categoryIndex}
            >
              Here You can see Your favourite {key}
              {key == "recipes" ? <Posts {...props} /> : null}
            </SlideFavourites>
          ))}
        </SliderFavourites>
      </div>
    </div>
  );
}

export default Favourites;
