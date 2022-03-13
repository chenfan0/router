const view = document.querySelector("#view");
const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");

const Home = () => {
  view.innerHTML = "<h1>Home</h1>";
};
const User = () => {
  view.innerHTML = "<h1>User</h1>";
};
const Profile = () => {
  view.innerHTML = "<h1>Profile</h1>";
};

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/user/:id",
    component: User,
  },
  {
    path: "/profile",
    component: Profile,
  },
];

function push(path) {
  location.hash = path;
}

btn1.addEventListener("click", function (e) {
  push("/user/123");
});

btn2.addEventListener("click", function (e) {
  push("/profile");
});

let currentRoute = null;
function processRoutes() {
  const curPath = !location.hash ? "/" : location.hash.slice(1);
  const curRoute = {
    path: curPath,
    params: {},
  };
  const matchRoute = routes.find((route) => {
    const curPathArr = curPath.split("/");
    const routePathArr = route.path.split("/");
    // 如果两个路径数组长度不一致，则不匹配
    if (curPathArr.length !== routePathArr.length) return false;
    for (let i = 0; i < routePathArr.length; i++) {
      if (routePathArr[i].startsWith(":")) {
        curRoute.params[routePathArr[i].slice(1)] = curPathArr[i];
      } else if (routePathArr[i] !== curPathArr[i]) {
        return false;
      }
    }
    return true;
  });
  if (matchRoute) {
    matchRoute.component();
    currentRoute = curRoute;
  }
}

window.addEventListener("DOMContentLoaded", processRoutes);
window.addEventListener("hashchange", processRoutes);
