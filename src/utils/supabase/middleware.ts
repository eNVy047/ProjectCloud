import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Define your protected and public-only routes
const protectedRoutes = ['/profile/*'];
const publicOnlyRoutes = ['/auth/*'];
const adminOnlyRoutes = ['/admin/*'];

export async function updateSession(request: NextRequest) {
  // Create the initial response object
  const supabaseResponse = NextResponse.next();

  // Initialize Supabase server client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Get the user from Supabase auth
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // Helper function to check if a path matches a route pattern
  const matchesRoute = (path: string, routePattern: string) => {
    const baseRoute = routePattern.replace('/*', '');
    return path === baseRoute || path.startsWith(`${baseRoute}/`);
  };

  // Redirect unauthenticated users from protected routes
  if (!user && protectedRoutes.some((route) => matchesRoute(path, route))) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Redirect authenticated users from public-only routes
  if (user && publicOnlyRoutes.some((route) => matchesRoute(path, route))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect non-admin users from admin-only routes
  if (!user?.app_metadata.claims_admin && adminOnlyRoutes.some((route) => matchesRoute(path, route))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Return the modified response
  return supabaseResponse;
}
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log(process.env.NEXT_SUPABASE_ANON_KEY);
