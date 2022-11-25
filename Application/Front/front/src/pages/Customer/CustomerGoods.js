import React, {useEffect} from "react";
import {Link, Navigate, Outlet, Route, Routes} from "react-router-dom";
import CustomerOrderForm from "./CustomerOrderForm";

export default function CustomerGoods() {
    const [goodsList , setGoodsList] = React.useState([]);

    useEffect(() => {
        loadGoods()
    }, []);

    const loadGoods = async () => {
        await fetch("http://localhost:8080/api/user/goods", {
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
                setGoodsList([...data]);
                console.log(goodsList)
            }).catch(error => {
                alert(error);
            })
    };




    return (
        <div className="container">
            Customer Goods table
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col" className="text-center">Name</th>
                        <th scope="col" className="text-center">Description</th>
                        <th scope="col" className="text-center">Price</th>
                        <th scope="col" className="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {goodsList.map((good, index) => (
                        <tr key={index}>
                            <td className="text-center">{good.name}</td>
                            <td className="text-center">{good.description}</td>
                            <td className="text-center">{good.price}</td>
                            <td className="text-center">
                                <Link className="btn btn-outline-success mr-2"
                                      to={{
                                    pathname: "/customer/main/orders/order",
                                    state:{good}
                                }}>
                                    BUY
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}