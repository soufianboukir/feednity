import { auth } from '@/auth'
import React from 'react'

async function page() {
    const data = await auth()
    console.log(data);
    
    return (
        <div>
            panel page
        </div>
    )
}

export default page
