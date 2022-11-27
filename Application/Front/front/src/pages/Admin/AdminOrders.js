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

    const changeOrder = async (orderName, userAddress) =>{
        console.log(orderName, userAddress)
       navigate(`/admin/main/orders/${orderName}/${userAddress}`)
    }

    return (
        <div style={{padding: "5px"}}>
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col" className="text-center">Order Name</th>
                        <th scope="col" className="text-center">Good Name</th>
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
                    {ordersList.map((good, index) => (
                        <tr key={index}>
                            <td className="text-center">{good.orderName}</td>
                            <td className="text-center">{good.goodName}</td>
                            {good.executorLogin !== 'executor' ? <td className="text-center">{good.executorLogin}</td>
                                : <td className="text-center"></td>}
                            <td className="text-center">{good.customerLogin}</td>
                            <td className="text-center">{good.deliveryDate}</td>
                            <td className="text-center">{good.orderDate}</td>
                            <td className="text-center">{good.userAddress}</td>
                            <td className="text-center">{good.deliveryAddress}</td>
                            <td className="text-center">
                                <button className="btn btn-primary mr-2" onClick={()=>changeOrder(good.orderName, good.userAddress)}>Change</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}