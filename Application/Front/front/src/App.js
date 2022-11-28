import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Navigate, Outlet, Route, Routes} from "react-router-dom";
import Registration from "./pages/AuthRegMain/Registration";
import React from "react";
import AdminMain from "./pages/Admin/AdminMain";
import AdminGoodsPage from "./pages/Admin/AdminGoodsPage";
import AdminOrders from "./pages/Admin/AdminOrders";
import Navbar from "./components/Navbar";
import Main from "./pages/AuthRegMain/Main";
import CustomerMain from "./pages/Customer/CustomerMain";
import CustomerGoods from "./pages/Customer/CustomerGoods";
import CustomerHistory from "./pages/Customer/CustomerHistory";
import CustomerOrders from "./pages/Customer/CustomerOrders";
import CustomerReview from "./pages/Customer/CustomerReview";
import StaffMain from "./pages/Staff/StaffMain";
import Reviews from "./pages/AuthRegMain/Reviews";
import StaffOrders from "./pages/Staff/StaffOrders";
import CustomerOrderForm from "./pages/Customer/CustomerOrderForm";
import AddGoodForm from "./pages/Admin/AddGoodForm";
import ChangeOrderForm from "./pages/Admin/ChangeOrderForm";
import ChangeOrderFormSecondStep from "./pages/Admin/ChangeOrderFormSecondStep";
import ConfirmUpdateOrder from "./pages/Admin/ConfirmUpdateOrder";
import CustomerSelectIssuePoint from "./pages/Customer/CustomerSelectIssuePoint";
import CustomerConfirmOrder from "./pages/Customer/CustomerConfirmOrder";
import Authorization from "./pages/AuthRegMain/Authorization";

function App() {


    return (<div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<><Navbar default="Welcome on Delivery Service"/><Outlet/></>
                }>
                    <Route path="/" element={<Main/>}/>
                    <Route exac path={"/registration"} element={<Registration/>}/>
                    <Route path={"/authorization"} element={<Authorization/>}/>
                </Route>

                <Route path={"/admin/main"} element={<><Navbar admin="true"/><Outlet/></>}>
                    <Route path={"/admin/main"} element={<AdminMain/>}/>
                    <Route path={"/admin/main/orders"} element={<AdminOrders/>}/>
                    <Route path={"/admin/main/goods"} element={<AdminGoodsPage/>}/>
                    <Route path={"/admin/main/goods/good"} element={<AddGoodForm/>}/>
                    <Route path={"/admin/main/orders/order"} element={<ChangeOrderForm/>}/>
                    <Route path={"/admin/main/reviews"} element={<Reviews/>}/>
                    <Route path={"/admin/main/orders/secondstep"}
                           element={<ChangeOrderFormSecondStep/>}/>
                    <Route path={"/admin/main/orders/order/confirm"}
                           element={<ConfirmUpdateOrder/>}/>
                </Route>

                <Route path={"/customer/main"} element={<><Navbar customer="true"/><Outlet/></>}>
                    <Route path={"/customer/main"} element={<CustomerMain/>}/>
                    <Route path={"/customer/main/goods"} element={<CustomerGoods/>}/>
                    <Route path={"/customer/main/history"} element={<CustomerHistory/>}/>
                    <Route path={"/customer/main/orders"} element={<CustomerOrders/>}/>
                    <Route path={"/customer/main/review"} element={<CustomerReview/>}/>
                    <Route path={"/customer/main/reviews"} element={<Reviews/>}/>
                    <Route path={"/customer/main/confirm/order"} element={<CustomerConfirmOrder/>}/>
                    <Route path={"/customer/main/orders/order/:name/:price"} element={<CustomerOrderForm/>}/>
                    <Route path={"/customer/main/orders/order/issue"} element={<CustomerSelectIssuePoint/>}/>
                </Route>

                <Route path={"/staff/main"} element={<><Navbar staff="true"/><Outlet/></>}>
                    <Route path={"/staff/main/reviews"} element={<Reviews/>}/>
                    <Route path={"/staff/main"} element={<StaffMain/>}/>
                    <Route path={"/staff/main/orders"} element={<StaffOrders/>}/>
                </Route>

                <Route
                    path="*"
                    element={<Navigate to="/authorization"/>}
                />
            </Routes>
        </Router>
    </div>);
}

export default App;
