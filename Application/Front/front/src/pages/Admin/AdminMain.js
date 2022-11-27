import React from "react";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import Navbar from "../../components/Navbar";
import AdminGoodsPage from "./AdminGoodsPage";
import AdminOrders from "./AdminOrders";

export default function AdminMain() {
    return (
            <div className="container">
                Admin Main
            </div>
    );
}