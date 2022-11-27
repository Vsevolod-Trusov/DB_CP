import React, {useEffect} from "react";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";

export default function StaffOrders() {
    const [ordersList , setOrdersList] = React.useState([]);

    useEffect(() => {
        loadOrders()
    }, []);

    const loadOrders = async () => {
        await fetch(`http://localhost:8080/api/staff/orders/${window.localStorage.getItem("staff_login")}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
                throw new Error(`${response.status}: ${response.text()}`)
            }).then(data => {
                setOrdersList([...data]);
                console.log(ordersList)
            }).catch(error => {
                alert(error);
            })
    };

    const onUpdate = async (orderName) =>{
        await fetch(`http://localhost:8080/api/staff/order/${orderName}`, {
            method: 'GET'
        })
            .then(response => {

                if (response.status === 200) {
                    return response.text()
                }
                throw new Error(`${response.status}`)
            }).then(data => {
                loadOrders()
                }).catch(error => {
                alert(error);
            })
    }

    return (
        <div className="container">
            Customer Goods table
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