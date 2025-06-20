import Image from 'next/image'
import React from 'react'
import feednity from '@/public/feednity-logo.png'
import Link from 'next/link'

export default function LogoTop() {
  return (
        <div className='flex items-center justify-center'>
            <Link href="/login" className="flex items-center gap-2 self-center font-medium text-lg">
                <div>
                    <Image src={feednity} width={40} height={40} alt='feednity logo'/>
                </div>
                feednity
            </Link>
        </div>
  )
}
