import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const token = request.cookies.get("token")?.value;
	const pathname = request.nextUrl.pathname;

	if (token && (pathname === "/login" || pathname === "/register")) {
		return NextResponse.redirect(
			new URL("/dashboard/contacts", request.url)
		);
	}

	if (!token && pathname.startsWith("/dashboard/contacts")) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*", "/login", "/register"],
};
