import { data } from 'autoprefixer';
import React, { useContext, useEffect, useState } from 'react';
import {AuthContext} from '../Login/Context/AuthProvider/AuthProvider';
import OrderRaw from './OrderRaw';
const Orders = () => {
    const {user , logOut} = useContext(AuthContext);
    const [orders ,setOrders ] = useState([])

    useEffect(() =>{
        fetch(`http://localhost:5000/orders?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            }
        })
        .then(res => {
            if(res.status === 401 || res.status === 403){
                return logOut()
            }
           return res.json()
        })
        .then(data => setOrders(data))
    },[user?.email, logOut])
    
    const handleDelete = id =>{
        const proceed = window.confirm('Are you sure? You want to cancel this item')
        if(proceed){
            fetch(`http://localhost:5000/orders/${id}`, {
                method : 'DELETE', 
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('genius-token')}`
                    }
                
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.deletedCount > 0){
                    alert('Successfully Deleted');
                    const remaining = orders.filter(odr => odr._id !== id);
                    setOrders(remaining);
                }
            })
        }
    }
    const handleStatusUpdate = id => {
        fetch(`http://localhost:5000/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type' : 'application/json',
                authorization : `Bearer ${localStorage.getItem('genius-token')}`
            },
            body: JSON.stringify({status: 'Approved'})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0) {
                const remaining = orders.filter(odr => odr._id !== id);
                const approving = orders.find(odr => odr._id === id);
                approving.status = 'Approved'
                
                const newOrders = [approving, ...remaining];
                setOrders(newOrders);
            }
        })
    }
    
    return (
        <div>
            <h2 className='text-5xl'>You Have Orders {orders.length}</h2>
            <div className="overflow-x-auto w-full">
  <table className="table w-full">
    
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th>Message</th>
      </tr>
    </thead>
    <tbody>
        {
            orders.map(order => <OrderRaw
            key={order._id}
            order={order}
            handleDelete={handleDelete}
            handleStatusUpdate={handleStatusUpdate}
            ></OrderRaw>)
        }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default Orders;