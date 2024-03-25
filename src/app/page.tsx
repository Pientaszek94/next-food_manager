"use client"
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function NotHome() {
    const pathname=usePathname()
    const router=useRouter()
    useEffect(()=>{
        if(pathname=="/"){
            router.push("/home")
        }
    },[pathname, router])
  return (
    <div>page</div>
  )
}

export default NotHome