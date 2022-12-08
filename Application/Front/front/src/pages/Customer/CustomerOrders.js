import React, {useEffect} from "react";

export default function CustomerOrders() {
    const [ordersList , setOrdersList] = React.useState([]);
    let groupListByOrder = []
    useEffect(() => {
        loadOrders()
    }, []);

    const changeCollection = (list) =>{
        let collection = list.reduce((r, a) => {

            r[a.orderName] = r[a.orderName] || [];

            r[a.orderName].push(a);

            return r
        }, {});

        let result = []
        let items = ""
        for(let key in collection){
            for(let item of collection[key]){
                items += `${item.goodName}, `
            }
            items = items.substring(0,items.length-2)
            result.push({
                orderName: key,
                orderDate: collection[key][0].orderDate,
                deliveryDate: collection[key][0].deliveryDate,
                orderStatus: collection[key][0].orderStatus,
                deliveryType: collection[key][0].deliveryType,
                goodsName: items,
                customerLogin: collection[key][0].customerLogin,
                executorLogin: collection[key][0].executorLogin,
                deliveryPoint: collection[key][0].deliveryPoint,
                price: collection[key][0].price
            })
            items = ""
        }
        return result
    }

    const loadOrders = async () => {
        await fetch(`http://localhost:8080/api/user/orders/${window.sessionStorage.getItem("customer_login")}`, {
            method: 'POST',
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
                groupListByOrder = changeCollection(data)
                setOrdersList([...groupListByOrder]);
            }).catch(error => {
                alert(error);
            })
    };

    const onDelete = async (orderName) =>{

        console.log(orderName)
        await fetch(`http://localhost:8080/api/user/order/${orderName}`, {
            method: 'DELETE'
        })
            .then(response => {

                if (response.status === 200) {
                    return response.text()
                }
                throw new Error(`${response.status}`)
            }).then(data => {
                loadOrders()
            }).catch(error => {
                alert(error);
            })
    }

    const onTook = async (orderName) =>{

        console.log(orderName)
        await fetch(`http://localhost:8080/api/staff/order/${orderName}`, {
            method: 'GET'
        })
            .then(response => {

                if (response.status === 200) {
                    return response.text()
                }
                throw new Error(`${response.status}`)
            }).then(data => {
                loadOrders()
            }).catch(error => {
                alert(error);
            })
    }
    return (
        <div className="container-fluid">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col" className="text-center">Order Name</th>
                        <th scope="col" className="text-center w-25">Goods Name</th>
                        <th scope="col" className="text-center">Executor</th>
                        <th scope="col" className="text-center">Delivery Date</th>
                        <th scope="col" className="text-center">Order Date</th>
                        <th scope="col" className="text-center">Price</th>
                        <th scope="col" className="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ordersList.map((good, index) => (
                        <tr key={index}>
                            <td className="text-center">{good.orderName}</td>
                            <td className="text-center">{good.goodsName}</td>
                            {good.executorLogin === 'executor'
                                ? <td className="text-center">{good.deliveryType}</td>
                                    : <td className="text-center">{good.executorLogin}</td>}
                            <td className="text-center">{good.deliveryDate}</td>
                            <td className="text-center">{good.orderDate}</td>
                            <td className="text-center">{good.price === 0?"":good.price}</td>
                            <td className="text-center">
                                {
                                    good.deliveryType === 'pickup'?
                                    <button className="btn btn-primary me-2"
                                    onClick={() => onTook(good.orderName)}>Took
                                    </button>
                                        :<></>
                                }
                                <button className="btn btn-danger justify-content-end"
                                        onClick={() => onDelete(good.orderName)}>Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}