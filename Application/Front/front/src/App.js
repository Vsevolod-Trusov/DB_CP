import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Navigate, Outlet, Route, Routes} from "react-router-dom";
import Registration from "./pages/Registration";
import React from "react";
import Authorisation from "./pages/Authorisation";
import AdminMain from "./pages/Admin/AdminMain";
import AdminGoodsPage from "./pages/Admin/AdminGoodsPage";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminStaff from "./pages/Admin/AdminStaff";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import CustomerMain from "./pages/Customer/CustomerMain";
import CustomerGoods from "./pages/Customer/CustomerGoods";
import CustomerHistory from "./pages/Customer/CustomerHistory";
import CustomerOrders from "./pages/Customer/CustomerOrders";
import CustomerReview from "./pages/Customer/CustomerReview";
import StaffMain from "./pages/Staff/StaffMain";
import StaffReviews from "./pages/Staff/StaffReviews";
import StaffOrders from "./pages/Staff/StaffOrders";

function App() {
    return (<div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<><Navbar default="Welcome on Delivery Service"/><Outlet/></>
                }>
                    <Route path="/" element={<Main/>} />
                    <Route exac path={"/registration"} element={<Registration/>}/>
                    <Route path={"/authorization"} element={<Authorisation/>}/>
                </Route>

                <Route path={"/admin/main"} element={<><Navbar admin="true"/><Outlet/></>}>
                    <Route path={"/admin/main"} element={<AdminMain/>}/>
                    <Route path={"/admin/main/orders"} element={<AdminOrders/>}/>
                    <Route path={"/admin/main/goods"} element={<AdminGoodsPage/>}/>
                    <Route path={"/admin/main/staff"} element={<AdminStaff/>}/>
                </Route>

                <Route path={"/customer/main"} element={<><Navbar customer="true"/><Outlet/></>}>
                        <Route path={"/customer/main"} element={<CustomerMain/>}/>
                        <Route path={"/customer/main/goods"} element={<CustomerGoods/>}/>
                        <Route path={"/customer/main/history"} element={<CustomerHistory/>}/>
                        <Route path={"/customer/main/orders"} element={<CustomerOrders/>}/>
                        <Route path={"/customer/main/review"} element={<CustomerReview/>}/>
                </Route>

                <Route path={"/staff/main"} element={<><Navbar staff="true"/><Outlet/></>}>
                    <Route path={"/staff/main"} element={<StaffMain/>}/>
                    <Route path={"/staff/main/orders"} element={<StaffOrders/>}/>
                    <Route path={"/staff/main/reviews"} element={<StaffReviews/>}/>
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
