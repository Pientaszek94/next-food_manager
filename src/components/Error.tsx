import React, { ReactNode } from 'react'

function Error({children, ...props}:{children: ReactNode, props?:any}) {
  return (
    <div
        style={{ color: '#f23838', textAlign: 'center', margin: '0.5rem 0' }}
        {...props}>

        {children}

    </div>
  )
}

export default Error