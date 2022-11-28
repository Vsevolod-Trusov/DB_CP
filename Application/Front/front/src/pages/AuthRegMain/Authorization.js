import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";


export default function Authorization() {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        login: "",
        password: ""
    });

    const { login, password } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit =  async (e) => {
        e.preventDefault();
        console.log("here")
        await fetch("http://localhost:8080/api/admin/authorization", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {

                if (response.status === 200) {
                    return response.json()
                }
                throw new Error(`${response.status}: ${response.text()}`)
            }).then(data => {

                if (data.role === 'user') {
                    window.localStorage.setItem("customer_login", `${data.login}`)
                    window.localStorage.setItem("customer_role", `${data.role}`)
                    navigate("/customer/main")
                }
                else if (data.role === 'admin'){
                    window.localStorage.setItem("admin_login", `${data.login}`)
                    window.localStorage.setItem("admin_role", `${data.role}`)
                    navigate(`/admin/main`)
                }
                else if (data.role === 'staff') {
                    window.localStorage.setItem("staff_login", `${data.login}`)
                    window.localStorage.setItem("staff_role", `${data.role}`)
                    navigate("/staff/main")
                }
            }).catch(error => {
                alert(error);
            })
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4" >Authorization</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="login" className="form-label">
                                Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your name"
                                name="login"
                                value={login}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type={"password"}
                                className="form-control"
                                placeholder="Enter your password"
                                name="password"
                                value={password}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary" onClick={(e)=>onSubmit(e)}>
                            Sign In
                        </button>
                        <div className="container mt-3">
                            <Link to="/registration">
                                Sign Up?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}