import React from "react";
import {Link, Navigate, Outlet, Route, Routes} from "react-router-dom";

export default function Main() {
    return (
        <div className="container">
            <div>
                Main
            </div>
            <Link className="btn border-1" to="/registration">
                Sign Up
            </Link>
            <Link className="btn border-1"  to="/authorization">
                Sign In
            </Link>
        </div>
    );
}