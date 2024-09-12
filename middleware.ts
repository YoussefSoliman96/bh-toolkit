export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/providers/new", "/admin", "/providers/edit/:id*"],
};
