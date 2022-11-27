import React, {useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CustomerOrderForm(props) {
    const navigate = useNavigate();
    const {name, price} = useParams();
    console.log(name)
    console.log(price)
    const [order, setOrder] = useState({
        customerLogin: window.localStorage.getItem("customer_login"),
        goodName: name,
        orderDate: new Date(),
        deliveryDate: new Date()
    });

    let [deliveryDate, setDeliveryDate] = useState(new Date());

    const onInputChange = (e) => {
        setOrder({...order, [e.target.name]: e.target.value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        order.deliveryDate = deliveryDate.setHours(deliveryDate.getHours() + 3);
        order.orderDate = order.orderDate.setHours(order.orderDate.getHours() + 3);

        if(order.deliveryDate - order.orderDate < 0)
            alert("Wrong delivery Date Data")

        console.log(JSON.stringify(order))

        fetch("http://localhost:8080/api/user/order", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'text/plain',
            },
            body: JSON.stringify(order)
        })
            .then(response => {

                if (response.status === 200) {
                    console.log(response.text)
                    return response.text()
                }
                throw new Error(`${response.status}`)
            }).then(data => {
                console.log(data)
                navigate("/customer/main/goods")
            }).catch(error => {
            alert(error.message)
            console.log(error)
            })
    };

    return (
        <div className="container col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Order</h2>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="goodName" className="form-label">
                        Good Name
                    </label>
                    <input
                        cursor="pointer"
                        type="text"
                        className="form-control"
                        name="goodName"
                        value={name}
                        readOnly={true}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                        Item Price
                    </label>
                    <input type="text" name="tourName"
                           className="form-control"
                           readOnly={true}
                           value={price}/>

                </div>

                <div className="mb-3">
                    <label htmlFor="tourDate" className="form-label">
                        Tour date
                    </label>
                    <DatePicker name="tourDate" className="form-control" selected={deliveryDate}
                                onChange={(date: Date) => setDeliveryDate(date)}/>
                </div>

                <div>
                    CHOOSE DELYVERY METHOD
                </div>

                <Link className="btn btn-outline-secondary m-2"
                      to="/customer/main/goods">
                    Cancel
                </Link>


                <button type="submit" className="btn btn-outline-success">
                    Confirm Buy
                </button>
            </form>
        </div>
    );
}