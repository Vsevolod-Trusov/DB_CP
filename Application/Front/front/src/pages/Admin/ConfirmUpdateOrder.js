import React from "react";
import {useNavigate, useParams} from "react-router-dom";

export default function ConfirmUpdateOrder() {
    const navigate = useNavigate()
    const {order, address, executor, customeraddress} = useParams();
    const back = () => {
        navigate(`/admin/main/orders/secondstep/${order}/${address}/${customeraddress}`)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(JSON.stringify({
            orderName: order,
            deliveryAddress: address,
            executorLogin: executor
        }))
        await fetch("http://localhost:8080/api/admin/order", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderName: order,
                deliveryAddress: address,
                executorLogin: executor
            })
        })
            .then(response => {
                if (response.status === 200) {
                    {
                        navigate(`/admin/main/orders`)
                        return response.text()
                    }
                }
                throw new Error(`${response.status}`)
            }).then(data => {
                console.log(data)
            }).catch(error => {
                alert(error)
            })
    }

        return (
            <>
                <div className="container col-md-6 offset-md-3 border p-4 mt-2 shadow">
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="order" className="form-label">
                                Order name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="order"
                                value={order}
                                readOnly={true}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">
                                Delivery address
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                value={address}
                                readOnly={true}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="executor" className="form-label">
                                Executor login
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="executor"
                                value={executor}
                                readOnly={true}
                            />
                        </div>

                        <button className="btn btn-outline-secondary m-2" onClick={() => back()}
                        >
                            Cancel
                        </button>

                        <button type="submit" className="btn btn-outline-success">
                            Confirm order
                        </button>
                    </form>
                </div>
            </>
        )
}