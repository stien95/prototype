import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth?p=sign-in",
  },
});
export const config = {
  matcher: ["/create/:path*"],
};
