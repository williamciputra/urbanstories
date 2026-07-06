import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const hostname = request.headers.get("host")?.split(":")[0];

    if (hostname !== "pawon.urbanstories.id") {
        return NextResponse.next();
    }

    const url = request.nextUrl.clone();

    // Root → /admin
    if (url.pathname === "/") {
        url.pathname = "/admin";
        return NextResponse.rewrite(url);
    }

    // Jangan rewrite kalau memang sudah /admin
    if (url.pathname.startsWith("/admin")) {
        return NextResponse.next();
    }

    // Rewrite semua route lain ke /admin
    url.pathname = `/admin${url.pathname}`;

    return NextResponse.rewrite(url);
}

export const config = {
    matcher: ["/((?!api|_next|favicon.ico).*)"],
};