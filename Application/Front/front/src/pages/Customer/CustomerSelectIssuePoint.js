import React, {useEffect} from "react";
import {Link, Navigate, Outlet, Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";

export default function CustomerSelectIssuePoint() {
    let location = useLocation();
    let navigate = useNavigate();
    const [pointsList, setPointsList] = React.useState([]);
    console.log(`Order: ${JSON.stringify(location.state)}`)
    useEffect(() => {
        loadPoints()
    }, []);

    const loadPoints = async () => {
        await fetch(`http://localhost:8080/api/user/routes/${window.localStorage.getItem("customer_login")}`, {
            method: 'GET', headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
                throw new Error(`${response.status}: ${response.text()}`)
            }).then(data => {
                setPointsList([...data]);
            }).catch(error => {
                alert(error);
            })
    };

    const confirmOrder = (deliveryPoint) =>{
        let sendedOrder = location.state;
        sendedOrder.deliveryAddress = deliveryPoint;
        console.log(`Order: ${JSON.stringify(sendedOrder)}`)
        navigate("/customer/main/confirm/order", {state: sendedOrder});
    }

    return (
        <div className="container">
            <div className="py-4">
               <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col" className="text-center">Delivery point</th>
                        <th scope="col" className="text-center">Distance</th>
                        <th scope="col" className="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pointsList.map((point, index) => (
                        <tr key={index}>
                            <td className="text-center">{point.deliveryPointName}</td>
                            <td className="text-center">{point.distance}</td>
                            <td className="text-center">
                                <button className="btn btn-success mr-2" onClick={()=>confirmOrder(point.deliveryPointName)}>Select</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Link className="btn btn-outline-secondary m-2"
                  to={`/customer/main/orders/order/${location.state.goodName}/${location.state.price}`}>
                Cancel
            </Link>
        </div>
    );
}