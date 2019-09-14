/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: "",
    // Relative to /src/views
    view: "UserProfile"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    view: "UserProfile"
  },
  {
    path: "/table-list",
    name: "Table List",
    view: "TableList"
  },
  {
    path: "/maps",
    view: "Maps"
  },
  {
    path: "/projects",
    view: "Projects"
  },
  {
    path: "/resume",
    view: "Resume"
  }
];
