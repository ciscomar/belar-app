import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  cookies().delete('dermadel')
  return NextResponse.json({ message: 'Logout Successfully'},
   { status: 200
  })
}