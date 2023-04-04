import {
  BrowserRouter, Route, Routes} from "react-router-dom";
import { Home, Iph14, Iph14p, Iph12, Iph11, Iph13 } from "../pages";
import { ProductDetail } from "../pages/ProductDetail";


export const MainRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/iph14" element={<Iph14 />} />
          <Route exact path="/iph14p" element={<Iph14p />} />
          <Route exact path="/iph12" element={<Iph12 />} />
          <Route exact path="/iph11" element={<Iph11 />} />
          <Route exact path="/iph13" element={<Iph13 />} />
          <Route exact path="/products/:productId" element={<ProductDetail />}/>
        </Routes>
    </BrowserRouter>
  )
};
