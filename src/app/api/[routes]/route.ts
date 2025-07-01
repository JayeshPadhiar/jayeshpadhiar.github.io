import { NextRequest, NextResponse } from "next/server";
import fetch from 'node-fetch';

const apiRoutes = {
    '/now-playing': {
        'GET': getNowPlaying,
    },
}

async function getNowPlaying(req: NextRequest) {
    return NextResponse.json({ message: 'Hello from the now playing API' });
}

export async function GET(req: NextRequest) {
    const pathname = req.nextUrl.pathname.split('/api')[1] || '';
    console.log(pathname);
    const route = apiRoutes[pathname as keyof typeof apiRoutes]?.['GET'];

    if (!route) {
        return NextResponse.json({ message: 'No route provided' }, { status: 404 });
    }

    return route(req);
}