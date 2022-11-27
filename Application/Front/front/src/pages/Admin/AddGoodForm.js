import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

export default function AddGoodForm() {

    let navigate = useNavigate()
    const [good, setGood] = useState({
        name: "",
        description: "",
        price: 0.0
    });

    let {name, description, price} = good;

     const sendGood = () => {
         fetch("http://localhost:8080/api/admin/good",
             {
                 method: 'POST',
                 headers:
                     {
                         "Content-Type": "application/json",
                     },
                 body: JSON.stringify(good)
             }
         )
             .then(response => {
                 if (response.status === 200) {
                     return response.text()
                 }
                 throw new Error(`${response.status}`)
             }).then(data => {
             console.log(data)
             navigate("/admin/main/goods")
         }).catch(error => {
             alert(error);
         })
     }

    const onInputChange = (e) => {
        setGood({...good, [e.target.name]: e.target.value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(good));
        sendGood();
    }

    return (
        <div className="container col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Good</h2>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Good name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={name}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                        Price
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={price}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea name="description" className="form-control" value={description}
                              onChange={e => onInputChange(e)}/>
                </div>
                <Link className="btn btn-secondary me-2" to="/admin/main/goods">
                    Cancel
                </Link>
                <button type="submit" className="btn btn-outline-primary " onClick={(e) => onSubmit(e)}>
                    Add good
                </button>
            </form>
        </div>
    )
}