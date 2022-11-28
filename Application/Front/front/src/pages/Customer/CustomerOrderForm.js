import React, {useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";

export default function CustomerOrderForm() {
    const navigate = useNavigate();
    const {name, price} = useParams();
    const [order, setOrder] = useState({
        customerLogin: window.localStorage.getItem("customer_login"),
        goodName: name,
        orderDate: new Date(),
        deliveryDate: new Date(),
        price: price,
        deliveryType: "pickup",
        deliveryAddress: "",
    });

    let [deliveryDate, setDeliveryDate] = useState(new Date());

    const onInputChange = (e) => {
        setOrder({...order, [e.target.name]: e.target.value});
    };

    const onSubmit = (e) => {
        e.preventDefault()
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

    const onSelectIssuePoint = () =>{
        order.deliveryDate = deliveryDate.setHours(deliveryDate.getHours() + 3);
        order.orderDate = order.orderDate.setHours(order.orderDate.getHours() + 3);
        order.price = price;
        navigate(`/customer/main/orders/order/issue`, {state: order})
    }

    return (
        <div className="container col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Order</h2>
            <form >
                <div className="mb-3">
                    <label htmlFor="goodName" className="form-label">
                        Good Name
                    </label>
                    <input
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
                        Delivery date
                    </label>
                    <DatePicker name="tourDate" className="form-control" selected={deliveryDate}
                                onChange={(date: Date) => setDeliveryDate(date)}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="deliveryType" className="form-label">
                        Delivery Type
                    </label>
                    <Form.Select aria-label="Default select example"
                                 name={"deliveryType"}
                                 value={order.deliveryType}
                                 onChange={(e)=>onInputChange(e)} >
                        <option value={"pickup"}>pickup</option>
                        <option value={"courier"}>courier</option>
                    </Form.Select>
                </div>

                <Link className="btn btn-outline-secondary m-2"
                      to="/customer/main/goods">
                    Cancel
                </Link>

                <button type="submit"  className="btn btn-outline-success"
                        onClick={(e) =>
                        {order.deliveryType === 'pickup'? onSelectIssuePoint() : onSubmit(e)}}>
                    {order.deliveryType === "pickup" ? "Select issue point" : "Confirm Buy"}
                </button>
            </form>
        </div>
    );
}