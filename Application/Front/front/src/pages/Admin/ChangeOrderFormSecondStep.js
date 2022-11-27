import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

export default function ChangeOrderFormSecondStep() {
    let {order, deliveryaddress,customeraddress} = useParams();
    const [executorsList, setExecutorsList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        loadeExecutors()
    }, []);
    const loadeExecutors = async () => {
        console.log(deliveryaddress)
        await fetch(`http://localhost:8080/api/admin/staff/${deliveryaddress}`, {
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
                setExecutorsList([...data]);
                console.log(executorsList)
            }).catch(error => {
                alert(error);
            })
    };
    const confirmUpdate = async (executorLogin) => {
        navigate(`/admin/main/orders/confirm/${order}/${deliveryaddress}/${customeraddress}/${executorLogin}`)
    };
    const back = () => {
        navigate(`/admin/main/orders/${order}/${customeraddress}`)
    }

    return (
        <>
            <div className="container">
                <div className="py-4">
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th scope="col" className="text-center">Executor</th>
                            <th scope="col" className="text-center">Amount of orders</th>
                            <th scope="col" className="text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {executorsList.map((executor, index) => (
                            <tr key={index}>
                                <td className="text-center">{executor.name}</td>
                                <td className="text-center">{executor.ordersCount}</td>
                                <td className="text-center">
                                    <button className="btn btn-outline-success mr-2" onClick={()=>confirmUpdate(executor.name)}>Select</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <button className="btn btn-outline-secondary m-2" onClick={() => back()}
                >
                    Cancel
                </button>
            </div>
        </>
    )
}