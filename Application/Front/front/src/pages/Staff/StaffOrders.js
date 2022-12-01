import React, {useEffect, useState} from "react";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";

export default function StaffOrders() {
    const [ordersList , setOrdersList] = React.useState([]);
    const [showError, setShowError] = useState("")

    useEffect(() => {
        loadOrders()
    }, []);

    const loadOrders = async () => {
        await fetch(`http://localhost:8080/api/staff/orders/${window.sessionStorage.getItem("staff_login")}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
               return response.json()

            }).then(data => {
                if(data.message) {
                    setShowError(data.message)
                    return
                }
                setOrdersList([...data]);
            })
    };

    const onUpdate = async (orderName) =>{
        await fetch(`http://localhost:8080/api/staff/order/${orderName}`, {
            method: 'GET'
        })
            .then(response => {

                if (response.ok) {
                    return response.text()
                }
                return response.json()
            }).then(data => {
                if(data.message) {
                    setShowError(data.message)
                    return
                }
                loadOrders()
                })
    }

    return (
        <div className="container">
            <div className="mb-3">
                <p className="text-danger" >{showError}</p>
            </div>
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col" className="text-center">Order Name</th>
                        <th scope="col" className="text-center">Good Name</th>
                        <th scope="col" className="text-center">Customer Login</th>
                        <th scope="col" className="text-center">Delivery Date</th>
                        <th scope="col" className="text-center">User Address</th>
                        <th scope="col" className="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ordersList.map((order, index) => (
                        <tr key={index}>
                            <td className="text-center">{order.orderName}</td>
                            <td className="text-center">{order.goodName}</td>
                            <td className="text-center">{order.customerLogin}</td>
                            <td className="text-center">{order.deliveryDate}</td>
                            <td className="text-center">{order.userAddress}</td>
                            <td className="text-center">
                                <button className="btn btn-success mr-2" onClick={()=>onUpdate(order.orderName)}>Execute</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}