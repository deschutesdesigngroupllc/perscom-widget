import { NextResponse } from 'next/server';

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-perscom-url', request.url);
  requestHeaders.set('x-perscom-path', request.nextUrl.pathname);

  if (request.nextUrl.searchParams.has('apikey')) {
    requestHeaders.set('x-perscom-apikey', request.nextUrl.searchParams.get('apikey'));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}
