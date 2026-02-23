import * as ROUTES from "./utils/consts";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Cart from "./pages/CartPage";
import Favorite from "./components/Favorite/Favorite";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import AddProduct from "./components/AddProduct/AddProduct";
import EditProduct from "./components/EditProduct/EditProduct";
import ProductDeteils from "./pages/ProductDetails/ProductDetails";
import Admin from "./pages/AdminOffice/Admin";
import PageNotFound from "./pages/PageNotFound";
import News from "./pages/News/News";
import Vacancies from "./pages/Vacancies/Vacancies";
import Oferta from "./pages/Oferta/Oferta";
import DeliveryPayment from "./pages/DeliveryPayment/DeliveryPayment";
import Return from "./pages/Return/Return";
import Bonus from "./pages/Bonus/Bonus";
import GiftSertificates from "./pages/GiftSertificates/GiftSertificates";
import ManageProducts from "./pages/AdminOffice/ManageProducts/ManageProducts";

const {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  HOME_ROUTE,
  CART_PAGE_ROUTE,
  FAVORITE_PAGE_ROUTE,
  ABOUT_ROUTE,
  CONTACT_ROUTE,
  ADD_PRODUCT_ROUTE,
  EDIT_PRODUCT_ROUTE,
  PRODUCT_DETAILS_ROUTE,
  ADMIN_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
  NEWS_ROUTE,
  VACANCIES_ROUTE,
  OFERTA_ROUTE,
  DELIVERY_PAYMENT_ROUTE,
  RETURN_ROUTE,
  BONUS_ROUTE,
  GIFT_SERTIFICATES_ROUTE,
  MANAGE_PRODUCTS_ROUTE,
} = ROUTES;

export const adminRoutes = [
  { path: ADMIN_ROUTE, element: <Admin /> },
  { path: MANAGE_PRODUCTS_ROUTE, element: <ManageProducts /> },
  { path: ADD_PRODUCT_ROUTE, element: <AddProduct /> },
  { path: `${EDIT_PRODUCT_ROUTE}/:id`, element: <EditProduct /> },
];

export const publicRoutes = [
  { path: HOME_ROUTE, element: <Home /> },
  { path: LOGIN_ROUTE, element: <Auth /> },
  { path: REGISTRATION_ROUTE, element: <Auth /> },
  { path: ABOUT_ROUTE, element: <About /> },
  { path: CONTACT_ROUTE, element: <Contact /> },
  {
    path: `${PRODUCT_DETAILS_ROUTE}/:id`,
    element: <ProductDeteils />,
  },
  { path: NEWS_ROUTE, element: <News /> },
  { path: VACANCIES_ROUTE, element: <Vacancies /> },
  { path: OFERTA_ROUTE, element: <Oferta /> },
  { path: DELIVERY_PAYMENT_ROUTE, element: <DeliveryPayment /> },
  { path: RETURN_ROUTE, element: <Return /> },
  { path: BONUS_ROUTE, element: <Bonus /> },
  { path: GIFT_SERTIFICATES_ROUTE, element: <GiftSertificates /> },
  {
    path: PAGE_NOT_FOUND_ROUTE,
    element: <PageNotFound />,
  },
  { path: CART_PAGE_ROUTE, element: <Cart /> },
];

export const authRoutes = [
  { path: FAVORITE_PAGE_ROUTE, element: <Favorite /> },
  { path: CART_PAGE_ROUTE, element: <Cart /> },
];

