import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function AdminGoodsPage() {
    const [goodsList, setGoodsList] = React.useState([]);
    const goodsPerTableList = 7
    const [indexOfFirstGood, setIndexOfFirstGood] = useState(1)
    const navigate = useNavigate()

    useEffect(() => {
        loadGoods(indexOfFirstGood, goodsPerTableList-1);
    }, []);


    const loadGoods = async (startIndexGood, interval) => {
        await fetch(`http://localhost:8080/api/user/goods/${startIndexGood}/${interval}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }else return response.json()
            }).then(data => {
                if(data.message){
                    setIndexOfFirstGood(0)
                    loadGoods(1, goodsPerTableList-1)
                }else setGoodsList([...data]);
            })
    };

    const onDelete = async (goodName) =>{

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
    }

    const addGood = () => {
        navigate("/admin/main/goods/good")
    }

    const previousTableList = () => {
        setIndexOfFirstGood(indexOfFirstGood - goodsPerTableList)
        loadGoods(indexOfFirstGood - goodsPerTableList, goodsPerTableList - 1);
    }

    const nextTableList = () => {
        setIndexOfFirstGood(indexOfFirstGood + goodsPerTableList)
        loadGoods(indexOfFirstGood + goodsPerTableList, goodsPerTableList - 1);
    }
    return (
        <div>
            <div className="container">
                <div className="py-4">
                    <div className="container" style={{paddingLeft: "2%", paddingRight: "2%", paddingBottom: "1%"}}>
                        <button className="btn btn-primary me-1"
                                disabled={(indexOfFirstGood - goodsPerTableList) <= 0}
                                onClick={() => previousTableList()}
                        >Back
                        </button>
                        <button className="btn btn-primary " onClick={() => nextTableList()}>Next</button>
                        <button className="btn btn-primary mb-2 offset-8" onClick={() => addGood()}>Add Good</button>
                    </div>
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
                                <button className="btn btn-danger mr-2" onClick={()=>onDelete(good.name)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}