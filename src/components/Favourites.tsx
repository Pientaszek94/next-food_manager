import React, { useState } from 'react'
import styles from "../styles/favourites.module.scss"
import Posts from './Posts'

function Favourites(props:any) {
    const {postsList}=props
    console.log("favPosts", postsList)
    const [catIndex, setCatIndex]=useState<number>(0)
    const categories=["recipes","tips"]

  return (
    <div className={styles.favourites}>
        {
            categories.map((key, index)=>(
                <button key={index} style={{borderBottom:`${catIndex==index?"2px solid orange":"none"}`}} 
                        onClick={()=>setCatIndex(index)}>
                            {key.charAt(0).toUpperCase()+key.slice(1)}
                </button>
            ))
        }
        <div className={styles.carousel_container}>
            <div className={styles.slider} 
                style={{marginLeft:`${-100 * catIndex}%`}}>
                {
                    categories.map((key, index)=>(
                        <div className={styles.slides} style={{opacity:`${catIndex==index?"1":"0"}`}} key={index}>
                            Here You can see Your favourite {key}
                            {
                                key=="recipes"
                                ?<Posts {...props}/>
                                :null
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Favourites