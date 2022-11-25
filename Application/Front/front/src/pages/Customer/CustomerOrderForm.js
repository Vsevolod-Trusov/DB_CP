import React, {useEffect, useState} from "react";
import {Navigate, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function CustomerOrderForm(props) {
    const navigate = useNavigate();
console.log(props)
    const [order, setOrder] = useState({
        customerLogin: window.localStorage.getItem("login"),
        goodName: props.goodName,
        orderDate: new Date()+new Date().getTimezoneOffset()*60000,
        deliveryDate: new Date()
    });

    const [deliveryDate, setDeliveryDate] = useState(new Date());

    const onInputChange = (e) => {
        setOrder({...order, [e.target.name]: e.target.value});
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        await fetch("http://localhost:8080/api/user/orders", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(order)
        })
            .then(response => {

                if (response.status === 200) {
                    console.log(response.text)
                    return response.text()
                }
                throw new Error(`${response.status}`)
            }).then(data => {
                console.log(data)
                navigate("/customer/main/goods")
            }).catch(error => {
                console.log(error)
            })
    };

    return (
        <div className="container col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Order</h2>

            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="goodName" className="form-label">
                        Good Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="goodName"
                        value={props.state.name}
                        readOnly={true}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                       Item Price
                    </label>
                    <input type="text" name="tourName"
                           className="form-control"
                           readOnly={true}
                           value={props.location.state.price}/>

                </div>

                <div className="mb-3">
                    <label htmlFor="tourDate" className="form-label">
                        Tour date
                    </label>
                    <DatePicker  name="tourDate"  className="form-control" selected={deliveryDate} onChange={(date:Date) => setDeliveryDate(date)}/>
                </div>

                <button type="submit" className="btn btn-outline-primary">
                    Confirm Buy
                </button>
            </form>
        </div>
    );
}