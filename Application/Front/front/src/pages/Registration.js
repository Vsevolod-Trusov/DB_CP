import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";

export default function Registration() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        login: "",
        password: "",
        email: "",
        role: "user"
    });

    const { login, password, email, role } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value});
    };

    const onSubmit =  async (e) => {
        e.preventDefault();
        navigate("/authorisation") //todo: удалить заглушку
       /* await fetch("http://localhost:8080/api/auth/registration", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {

                if(response.status == 200){
                    navigate("/authorisation")
                    return response.text()
                }
                throw new Error(`${response.status}: ${response.text()}`)
            }).then(data=>{
                console.log(data)
            }).catch(error => {
                navigate("/error")
                console.log(error)
            })*/
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Registration</h2>

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
                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">
                                E-mail
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your e-mail address"
                                name="email"
                                value={email}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Role" className="form-label">
                                Role
                            </label>
                            <Form.Select aria-label="Default select example"
                                         name={"role"}
                                         value={role} onChange={(e)=>onInputChange(e)} >
                                <option value={"user"}>user</option>
                                <option value={"admin"}>admin</option>
                                <option value={"staff"}>staff</option>
                            </Form.Select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Location" className="form-label">
                                Region
                            </label>
                            <Form.Select aria-label="Default select example"
                                         name={"Location"} disabled={true}
                                         value={role} onChange={(e)=>onInputChange(e)} >
                                <option value={"user"}>user</option>
                                <option value={"admin"}>admin</option>
                                <option value={"staff"}>staff</option>
                            </Form.Select>
                        </div>
                        <button type="submit" className="btn btn-outline text-white"  style={{background: "#c402b4"}}>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}