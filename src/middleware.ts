import { NextRequest, NextResponse } from 'next/server'
import { fallbackLng, languages } from '../i18n/settings'

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	const hasLocaleInPath = languages.some((lng) =>
		pathname.startsWith(`/${lng}`)
	)

	if (!hasLocaleInPath) {
		return NextResponse.redirect(new URL(`/${fallbackLng}`, request.url))
	}

	return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico).*)']
}