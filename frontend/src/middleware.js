import { NextResponse } from "next/server"

export function middleware(request) {

  const jwt= request.cookies.get("dermadel")

  if (!jwt) return NextResponse.redirect(new URL("/", request.url))
  

  
}

export const config = {
  matcher: ['/capture', '/calendar', '/delivery', '/menu', '/deliveries', '/inventory', '/material', '/destination']
}