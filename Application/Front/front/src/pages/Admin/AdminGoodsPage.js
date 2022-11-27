import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
export default function AdminGoodsPage() {
    const [goodsList , setGoodsList] = React.useState([]);

    const navigate=useNavigate()
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
            }).catch(error => {
                alert(error);
            })
    };

   /* const onDelete = async (goodName) =>{

        await fetch(`http://localhost:8080/api/admin/good/${goodName}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.status === 200) {
                    return response.text()
                }

                throw new Error(`${response.status}: Error while deleting good`)
            }).then(data => {
                loadGoods()
                console.log(data)
            }).catch(error => {
                alert(error);
            })
    }*/

    const addGood = () =>{
        navigate("/admin/main/goods/good")
    }
    return (
        <div>
            <div className="container py-4">
                <button className="btn btn-primary mb-2 offset-9"  onClick={()=>addGood()}>Add Good</button>
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col" className="text-center">Name</th>
                        <th scope="col" className="text-center">Description</th>
                        <th scope="col" className="text-center">Price</th>
                       {/* <th scope="col" className="text-center">Action</th>*/}
                    </tr>
                    </thead>
                    <tbody>
                    {goodsList.map((good, index) => (
                        <tr key={index}>
                            <td className="text-center">{good.name}</td>
                            <td className="text-center">{good.description}</td>
                            <td className="text-center">{good.price}</td>
                           {/* <td className="text-center">
                                <button className="btn btn-danger mr-2" onClick={()=>onDelete(good.name)}>Delete</button>
                            </td>*/}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}