import {
  BrowserRouter, Route, Routes} from "react-router-dom";
import { Home, Iph12, Users } from "../pages";
import { ProductDetail } from "../pages/ProductDetail";


export const MainRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/iph12" element={<Iph12 />} />
          <Route exact path="/products/:productId" element={<ProductDetail />}/>
          <Route exact path="/users" element={<Users />}/>
        </Routes>
    </BrowserRouter>
  )
};
