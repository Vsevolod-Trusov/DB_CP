import React from "react";
import {Link} from "react-router-dom";
import LogoImg from "../images/appIcon.ico";

export default function Navbar(props) {
    return (<div>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{background: "#c402b4"}}>
            <div className="container-fluid">
                <img src={LogoImg} alt='#' className="img-fluid" style={{width: "5%", height: "5%"}}/>
                {props.default ? <>
                        <div className="container-lg text-white">{props.default}</div>
                    </>

                    : props.admin ? <>
                        <div className="container-fluid text-white">
                            <Link className="btn btn-outline-light m-lg-1" to="/admin/main">
                                Home
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/admin/main/orders">
                                Orders
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/admin/main/goods">
                                Goods
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/admin/main/staff">
                                Staff
                            </Link>
                        </div>
                        <Link className="btn btn-outline-light justify-content-end" to="/authorisation">
                            Exit
                        </Link>
                    </> : props.customer ? <>
                        <div className="container-fluid text-white">
                            <Link className="btn btn-outline-light m-lg-1" to="/customer/main">
                                Home
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/customer/main/goods">
                                Goods
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/customer/main/history">
                                History
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/customer/main/orders">
                                Orders
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/customer/main/review">
                                Orders
                            </Link>
                        </div>
                        <Link className="btn btn-outline-light justify-content-end" to="/authorisation">
                            Exit
                        </Link>
                    </> : props.staff ? <>
                        <div className="container-fluid text-white">
                            <Link className="btn btn-outline-light m-lg-1" to="/staff/main">
                                Home
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/staff/main/orders">
                                Orders
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/staff/main/reviews">
                                Reviews
                            </Link>
                        </div>
                        <Link className="btn btn-outline-light justify-content-end" to="/authorisation">
                            Exit
                        </Link>
                    </> : <> <Link className="navbar-brand" to="/"/></>}
            </div>
        </nav>
    </div>);
}