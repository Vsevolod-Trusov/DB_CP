import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import LogoImg from "../images/appIcon.ico";

export default function Navbar(props) {
    const {login} = useParams()
    const navigate = useNavigate()
    const customerExit = ()=>{
        localStorage.removeItem("customer_login");
        localStorage.removeItem("customer_role");
        navigate("/authorisation");
    }

    const staffExit = ()=>{
        localStorage.removeItem("staff_login");
        localStorage.removeItem("staff_role");
        navigate("/authorisation");
    }

    const adminExit = ()=>{
        localStorage.removeItem("admin_login");
        localStorage.removeItem("admin_role");
        navigate("/authorisation");
    }

    return (<div>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{background: "#c402b4"}}>
            <div className="container-fluid">
                <img src={LogoImg} alt='#' className="img-fluid" style={{width: "5%", height: "5%"}}/>
                {props.default ? <>
                        <div className="container-lg text-white">{props.default}</div>
                    </>

                    : props.admin ? <>
                        <div className="text-white p-md-1">{window.localStorage.getItem("admin_login")}</div>
                        <div className="container-fluid text-white" style={{paddingRight: "40px"}}>
                            <Link className="btn btn-outline-light m-lg-1" to="/admin/main">
                                Home
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/admin/main/orders">
                                Orders
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/admin/main/goods">
                                Goods
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/admin/main/reviews">
                                Show
                            </Link>
                        </div>
                        <button className="btn btn-outline-light justify-content-end" onClick={()=>adminExit()}>
                            Exit
                        </button>
                    </> : props.customer ? <>
                        <div className="text-white p-md-1">{window.localStorage.getItem("customer_login")}</div>
                        <div className="container-fluid text-white" style={{paddingRight: "40px"}}>
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
                                Review
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/customer/main/reviews">
                                Show
                            </Link>
                        </div>
                        <button className="btn btn-outline-light justify-content-end" onClick={()=>customerExit()}>
                            Exit
                        </button>
                    </> : props.staff ? <>
                        <div className="text-white p-md-1">{window.localStorage.getItem("staff_login")}</div>
                        <div className="container-fluid text-white" style={{paddingRight: "40px"}}>
                            <Link className="btn btn-outline-light m-lg-1" to="/staff/main">
                                Home
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/staff/main/orders">
                                Orders
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/staff/main/reviews">
                                Show
                            </Link>

                        </div>
                        <button className="btn btn-outline-light justify-content-end" onClick={()=>staffExit()}>
                            Exit
                        </button>
                    </> : <> <Link className="navbar-brand" to="/"/></>}
            </div>
        </nav>
    </div>);
}