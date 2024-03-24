"use client"
import { GET_POSTS } from '@/apollocms/queries'
import Profile from '@/components/Profile'
import { useAppSelector } from '@/redux/hooks'
import { useQuery } from '@apollo/client'
import React from 'react'

function UserProfile() {
  const userInfo=useAppSelector(({auth})=>auth.userInfo)
  const postsApi=useQuery(GET_POSTS)
    const posts=postsApi?.data?.posts
        console.log("POst", postsApi)
    
    if(userInfo!==null&&userInfo.active){
        return(
            <Profile userInfo={userInfo}  
                postsList={posts?.filter((post:any)=>{
                    const isIndex=userInfo?.recipes
                                ?.findIndex((recipe:string)=>post.slug==recipe)
                    if(isIndex!=-1){
                        return post
                    }
                })}/>
            // <Profile userInfo={userInfo} postsList={postsApi.data.posts}/>
        )
    }
    else{
        return (
        <div>
            Not Auth
        </div>
        )
    }
}

export default UserProfile