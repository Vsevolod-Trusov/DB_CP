import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";

export default function Registration() {
    let points=[];
    const navigate = useNavigate();

    const [user, setUser] = useState({
        login: "",
        password: "",
        email: "",
        role: "user",
        pointName: ""
    });

    const [pointsList, setPointsList] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const { login, password, email, role, pointName } = user;
    useEffect(() => {
        loadPoints()
    }, []);
    const loadPoints = () => {
        fetch("http://localhost:8080/api/admin/points", {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        })
            .then(response => {
                if(response.status === 200){
                    return response.json()
                }
                throw new Error(`${response.status}`)
            }).then(data=>{
              setPointsList([...data])
        }).catch(error => {
            alert(error)//todo fix drop alert
        })

    }

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value});
        console.log(e.target.value)
    };

    const onSubmit =  async (e) => {
        e.preventDefault();
        await fetch("http://localhost:8080/api/admin/registration", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {

                if(response.status === 200){
                    navigate("/authorisation")
                    return response.text()
                }
                throw new Error(`${response.status}: ${response.text()}`)
            }).then(data=>{
                console.log(data)
            }).catch(error => {
                alert(error)//todo fix drop alert
            })
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
                            <label htmlFor="pointName" className="form-label">
                                Region
                            </label>
                            <select
                                        className="form-select"
                                        name="pointName" disabled={isDisabled}
                                        value={pointName}
                                        onChange={(e)=>onInputChange(e)}>
                               {
                                   role==='user'?  pointsList.filter(item => item.type === 'user').map((point, index) => (
                                         <option key={index} value={point.pointName}>{point.pointName}</option>
                                   )) : role === "staff" || role === "admin" ? pointsList.filter(item => item.type === 'staff').map((point, index) => (
                                       <option key={index} value={point.pointName}>{point.pointName}</option>
                                      )) : <option value={""}>Select role</option>
                               }
                            </select>
                        </div>
                        <button type="submit" className="btn btn-outline text-white"  style={{background: "#c402b4"}}>
                            Sign Up
                        </button>
                        <div className="container mt-3">
                            <Link to="/authorization">
                                Sign Up?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}