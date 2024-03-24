"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client=new ApolloClient({
    uri:'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clsxjscbu0sos0hw66f9ck3al/master',
    cache: new InMemoryCache()
    // header:{
    //   Authorization: `Bearer ${import.meta.env.REACT_APP_TOKEN_CMS||"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MDk3Mjg1NDIsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2xzeGpzY2J1MHNvczBodzY2ZjljazNhbC9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vIiwic3ViIjoiOGE4MGJhOTEtOTRlMi00MDk4LWEzYTgtODM1MjI5NDNkYTM4IiwianRpIjoiY2x0ZnM4YWF4MDRyYjA3dzQydmxhNnB5ciJ9.YD-D---sgZ4pEXC98dNyaRkqF2E3z9pSqkdE5LvK9-84TRFajsw7cMgbMMqb2O28xuWoGmZu2lbIBw4p2Osc-w9t6HmZl8qlZ-q5cKKYrZ0REtvHk6L1JPLXqLbRrdLgIKmMu6I8hSadmy_fWo1bhwbF_tGiHtMu8BYzNj4iaZ_mwxZwyR_eGfhHCtAnXjTy40TqZX-zdtKHUuPuHrB1_37Jb721zmCBAker8qJvNa3d4dvn9owOUPmueOh6P6SL_TDbTOX9BMvbHmBnBrAft342ps9oX-Ub0MBMqed-m_rVCr5R8g6_sqr7EmvTfL3U4qJPdxbp0N4UOIdW-_7rBf33lsbluzJlMpB19YhiX4HF3ZrCl-0ECN_jkWh-JBZUckEzmX9xSA6xxQU4lo2lsaJpQMGNPwZJ70Ou5GK0VtMeAdR-7y1OXERO-Q1pYRx1ZDrN36ORpc-sooR907ori2LDee_DevVwY1XpAbrHizQCYc4vRq6GSpISTF4nBbtvUfJPBCe5k_Z15R0oEg4fJdy4cuRcXJDIjY5EssTpFV-Rjf6XNc_5mLNnQMwQUqOm5l-fg17HlXqdyDCZm36fuBQT9JnYY7z1mxt0oFBxbmQ6rUrnwjFhv_RIqDohXEhNyunB2wzSnkfPeN94q6qeP7uzvtZxwfaNiexXdE7iWog"}`
    // }
  })

export function ApolloProv({children}:{children: React.ReactNode}){
    return <ApolloProvider client={client}>{children}</ApolloProvider>
}