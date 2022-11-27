import React, {useState} from "react";
import {Navigate, Outlet, Route, Routes, useNavigate, useParams} from "react-router-dom";

export default function CustomerReview() {
    const navigate = useNavigate();

    const [review, setReview] = useState({
        content: "",
        estimation : 0,
        reviewerLogin: window.localStorage.getItem("customer_login")
    });

    let {content, estimation} = review;

    const onInputChange = (e) => {
        setReview({...review, [e.target.name]: e.target.value});
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify(review))
        await fetch("http://localhost:8080/api/user/review", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(review)
        })
            .then(response => {

                if (response.status === 200) {
                    return response.text()
                }
                throw new Error(`${response.status}`)
            }).then(data => {
                console.log(data)
                navigate("/customer/main")
            }).catch(error => {
                alert(error)
                console.log(error)
            })
    };

    return (
        <div className="container col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Review</h2>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="estimation" className="form-label">
                        Estimation
                    </label>
                    <input
                        min={0}
                        max={10}
                        className="form-control"
                        type="number"
                        name="estimation"
                        value={estimation}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        name="content"
                        value={content}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <button type="submit" className="btn btn-outline-primary">
                    Send
                </button>
            </form>
        </div>
    );
}