import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function ChangeOrderForm() {
    const {order, address} = useParams();
    const [pointsList, setPointsList] = useState([]);
    let navigate = useNavigate()
    useEffect(() => {
        loadPoints()
    }, []);
    const loadPoints = () => {
        fetch(`http://localhost:8080/api/admin/route/${address}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if(response.status === 200){
                    return response.json()
                }
                throw new Error(`${response.status}`)
            }).then(data=>{
            setPointsList([...data])
        }).catch(error => {
            alert(error)//todo fix drop alert
        })
    }

    const filterByDistance = () =>{
            setPointsList([...pointsList.sort((a, b) => a.distance - b.distance)])
    }

    const filterByDistanceDesc = () =>{
            setPointsList([...pointsList.sort((a, b) => b.distance - a.distance)])
    }

    const secondChangeStep = (deliveryAddress) =>{
        navigate(`/admin/main/orders/secondstep/${order}/${deliveryAddress}/${address}`)
    }

    return (
        <>
            <div className="container col-md-6 border rounded p-4 mt-2 shadow">
                <div className="container-fluid justify-content-lg-between">
                    <div className="container-fluid ">
                        <Link className="btn btn-secondary" to="/admin/main/orders">
                            Cancel
                        </Link>
                        <button className="btn btn-primary offset-7" onClick={()=>filterByDistance()}>
                            Asc
                        </button>
                        <button className="btn btn-primary m-lg-2 offset-5" onClick={()=>filterByDistanceDesc()}>
                            Desc
                        </button>
                    </div>
                </div>
                <table className="table border">
                    <thead>
                    <tr>
                        <th scope="col" className="text-center">Delivery Address</th>
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
                                <button className="btn btn-primary mr-2"  onClick={()=>secondChangeStep(point.deliveryPointName)}>Select staff</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}