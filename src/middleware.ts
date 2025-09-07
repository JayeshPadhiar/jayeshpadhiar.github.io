import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

export default async function middleware(request: NextRequest) {
	const method = request.method;
	if (method === "GET") {
		return NextResponse.next();
	}

	try {
		const token = request.headers.get("Authorization");
		if (!token) {
			return NextResponse.json({ message: "Unauthorized", error: "Token not found" }, { status: 401 });
		}
		const { payload } = await jwtVerify(token || "", new TextEncoder().encode(process.env.JWT_SECRET));

		if (!payload) {
			return NextResponse.json({ message: "Unauthorized", error: "Token not found" }, { status: 401 });
		}
		return NextResponse.next();
	} catch (error) {
		return NextResponse.json({ message: "Unauthorized", error: "Token not found" }, { status: 401 });
	}
}

export const config = {
	matcher: [
		"/api/v1/posts",
		"/api/v1/posts/:path*",
		"/api/v1/home",
		"/api/v1/books",
		"/api/v1/now",
	],
};