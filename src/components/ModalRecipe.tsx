"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import modalStyles from "../styles/modal_recipes.module.scss"
import Logo from './Logo'
import { userInfoInterface } from '../../utils/interfaces'
function ModalRecipe({postsList, userInfo}:{postsList:any[], userInfo:userInfoInterface|null}) {
    const recipe=useSearchParams().get("recipe")
    const pathname=usePathname()
    const router=useRouter()
    const [checkedIndex, setCheckedIndex]=useState<number|null>()
    const [currentRecipe, setCurrentRecipe] = useState<number|null>()

    console.log("RECIPE", recipe)

    console.log("checkedIndex", checkedIndex)
    console.log("currentRecipe", currentRecipe)

    useEffect(()=>{
        setCurrentRecipe(postsList?.findIndex((obj)=> obj.slug==recipe))
        setCheckedIndex(postsList?.findIndex((obj)=> obj.slug==recipe))
      },[recipe])

    const nextRecipe=()=>{
        router.push(pathname+"?recipe="+postsList[currentRecipe!+1]?.slug)
    }

    const prevRecipe=()=>{
        if(currentRecipe==0){}
        router.push( pathname+"?recipe="+postsList[currentRecipe!-1]?.slug)
    }

    const checkNext=()=>{
            setCheckedIndex((prevState)=> prevState!+1)
    
    }
    const checkPrev=()=>{
            setCheckedIndex((prevState)=> prevState!-1)
    }
    


  if(recipe){
    return(
        <div className={modalStyles.modal_recipes}>
            <header className={modalStyles.head}>
                <Logo/>
                <button className='orange' onMouseEnter={()=>currentRecipe!>0?checkPrev():null} 
                                            onMouseLeave={()=>currentRecipe!>0?checkNext():null}
                                            onClick={prevRecipe} disabled={currentRecipe==0}>
                    <span className="material-symbols-outlined">
                            arrow_back
                    </span>
                </button>
                <div className={modalStyles.recipe_previews_container}>
                    <div className={modalStyles.slider} 
                                style={{height:`${47*postsList?.length}px`, marginTop:`${-47 * checkedIndex!}px`}}>
                        {
                            postsList?.map((recipe:any)=>(
                                <div className={modalStyles.slides} key={recipe.id}>
                                    <h4>
                                        {recipe?.title.toUpperCase()}
                                    </h4>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <button className="orange" onMouseEnter={()=>currentRecipe!>=postsList?.length-1?null:checkNext()} 
                                            onMouseLeave={()=>currentRecipe!>=postsList?.length-1?null:checkPrev()}
                                            onClick={nextRecipe} disabled={currentRecipe!>=postsList?.length-1}>
                    <span className="material-symbols-outlined">
                        arrow_forward
                    </span>
                </button>
                <button className={modalStyles.transp_bg} 
                            onClick={()=>router.push(pathname)}>
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </button>
            </header>
            <div className={modalStyles.recipe_grid}>
                <div className={modalStyles.image_carousel}>
                    <div className={modalStyles.slider}
                            style={{width:`${100*postsList?.length}%`, marginLeft:`${-100 * currentRecipe!}%`}}>
                        {
                            postsList?.map((recipe)=>(
                                <div className={modalStyles.slides} key={recipe.id}
                                style={{
                                    backgroundImage:`url(${recipe.foodImages[0]?.url})`,
                                    backgroundPosition:"center",
                                    backgroundSize:"cover"
                                        }}></div>
                                ))
                        }
                    </div>
                </div>
                <div className={modalStyles.recipes_carousel}>
                    <div className={modalStyles.slider}
                            style={{width:`${100*postsList?.length}%`, marginLeft:`${-100 * currentRecipe!}%`}}>
                         {
                            postsList?.map((recipe)=>(
                                <div className={modalStyles.slides} key={recipe.id}>
                                        <div className={modalStyles.info_recipe}>
                                            <h4>                    
                                                <span className="material-symbols-outlined">
                                                favorite 
                                                </span>
                                                {" "+recipe.likes}
                                            </h4>
                                            <h4 className={modalStyles.timer}>
                                                <span className="material-symbols-outlined">
                                                    timer
                                                </span>  
                                                {" "+recipe.cookingTime+" mins"}
                                            </h4>
                                            <h4 className={modalStyles.portions}>
                                                <span className="material-symbols-outlined">
                                                    safety_divider
                                                </span>
                                                {" "+recipe.portions}
                                            </h4>
                                        </div>
                                        <div className={modalStyles.desc_recipe}>
                                            <div>
                                                <h2>
                                                    FM
                                                </h2>
                                            </div>
                                            <h4>
                                                {recipe.description+" "}
                                            
                                            </h4>
                                        </div>
                                        <div className={modalStyles.recipe_list_steps}>
            
                                            <div className={modalStyles.recipe_list}>
                                                <h3>Ingredients</h3>
                                                <div dangerouslySetInnerHTML={{__html:recipe.productList.html}}/>
                                            </div>

                                            <div className={modalStyles.recipe_steps}>
                                                <h3>Recipes Steps</h3>
                                                <div dangerouslySetInnerHTML={{__html:recipe.content.html}}/>
                                            </div>
                                        </div>
                                </div>
                                    ))
                        }    
                    </div>
                </div>
            </div>
        </div>
    )
  }
  else{
    return
  }
}

export default ModalRecipe