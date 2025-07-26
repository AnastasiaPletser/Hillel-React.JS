import * as ROUTES from "./utils/consts";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Cart from "./pages/CartPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AddProduct from "./components/AddProduct/AddProduct";
import ProductDeteils from "./pages/ProductDetails/ProductDetails";
import Admin from "./pages/AdminOffice/Admin";
import PageNotFound from "./pages/PageNotFound";

const {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  HOME_ROUTE,
  CART_PAGE_ROUTE,
  ABOUT_ROUTE,
  CONTACT_ROUTE,
  ADD_PRODUCT_ROUTE,
  PRODUCT_DETAILS_ROUTE,
  ADMIN_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
} = ROUTES;

export const adminRoutes = [{ path: ADMIN_ROUTE, Component: Admin }];

export const publicRoutes = [
  { path: HOME_ROUTE, Component: Home },

  { path: LOGIN_ROUTE, Component: Auth },

  { path: REGISTRATION_ROUTE, Component: Auth },

  { path: CART_PAGE_ROUTE, Component: Cart },

  { path: ABOUT_ROUTE, Component: About },

  { path: CONTACT_ROUTE, Component: Contact },

  { path: ADD_PRODUCT_ROUTE, Component: AddProduct },

  { path: PRODUCT_DETAILS_ROUTE + "/:id", Component: ProductDeteils },

  { path: PAGE_NOT_FOUND_ROUTE, Component: PageNotFound },

  { path: ADD_PRODUCT_ROUTE, Component: AddProduct },
];
