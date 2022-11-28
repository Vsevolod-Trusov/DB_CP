import React from "react";
import {Link, Navigate, Outlet, Route, Routes} from "react-router-dom";

export default function Main() {
    return (
        <div className="container">
            <div >
                Main
            </div>
            <Link className="btn btn-primary me-2" to="/registration">
                Sign Up
            </Link>
            <Link className="btn btn-primary"  to="/authorization">
                Sign In
            </Link>
        </div>
    );
}