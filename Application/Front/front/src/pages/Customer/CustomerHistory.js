import React, {useEffect} from "react";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";

export default function CustomerHistory() {
    const [historyList , setHistoryList] = React.useState([]);

    useEffect(() => {
        loadHistory()
    }, []);

    const loadHistory = async () => {
        await fetch(`http://localhost:8080/api/user/history/${window.localStorage.getItem("customer_login")}`, {
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
                setHistoryList([...data]);
                console.log(historyList)
            }).catch(error => {
                alert(error);
            })
    };

    return (
        <div className="container">
            Customer History table
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col" className="text-center">Name</th>
                        <th scope="col" className="text-center">Status</th>
                            <th scope="col" className="text-center">Delivery Date</th>
                            <th scope="col" className="text-center">Order Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {historyList.map((good, index) => (
                        <tr key={index}>
                            <td className="text-center">{good.name}</td>
                            <td className="text-center">{good.status}</td>
                            <td className="text-center">{good.deliveryDate}</td>
                            <td className="text-center">{good.orderDate}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}