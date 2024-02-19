import Link from 'next/link'
import React from 'react'

export default function AuthTroublePage() {
  return (
    <main className='w-full p-2 '>
      <ul className='border border-gray-300'>
        <li>
          <Link className='w-full p-2 flex hover:bg-black/5' href="/auth/trouble?p=forgot-password">Olvide mi contraseña</Link>
        </li>
      </ul>
    </main>
  )
}
