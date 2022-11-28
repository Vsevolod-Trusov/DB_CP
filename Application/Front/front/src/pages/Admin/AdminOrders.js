import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function AdminOrders() {
    const [ordersList , setOrdersList] = React.useState([]);
    const navigate =useNavigate()
    useEffect(() => {
        loadOrders()
    }, []);

    const loadOrders = async () => {
        await fetch(`http://localhost:8080/api/admin/orders`, {
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

    const changeOrder = async (order) =>{
        console.log(order)
       navigate(`/admin/main/orders/order`, {state: order})
    }

    return (
        <div style={{padding: "5px"}}>
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col" className="text-center">Good Name</th>
                        <th scope="col" className="text-center">Status</th>
                        <th scope="col" className="text-center">Executor</th>
                        <th scope="col" className="text-center">Customer Login</th>
                        <th scope="col" className="text-center">Delivery Date</th>
                        <th scope="col" className="text-center">Order Date</th>
                        <th scope="col" className="text-center">User Address</th>
                        <th scope="col" className="text-center">Delivery Address</th>
                        <th scope="col" className="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ordersList.map((order, index) => (
                        <tr key={index}>
                            <td className="text-center">{order.goodName}</td>
                            <td className="text-center">{order.status}</td>
                            {order.executorLogin !== 'executor' ? <td className="text-center">{order.executorLogin}</td>
                                : <td className="text-center"></td>}
                            <td className="text-center">{order.customerLogin}</td>
                            <td className="text-center">{order.deliveryDate}</td>
                            <td className="text-center">{order.orderDate}</td>
                            <td className="text-center">{order.userAddress}</td>
                            <td className="text-center">{order.deliveryAddress}</td>
                            <td className="text-center">
                                <button className="btn btn-primary mr-2" onClick={()=>changeOrder(order)}>Change</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}