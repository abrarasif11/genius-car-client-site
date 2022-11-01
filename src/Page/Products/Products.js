import React, { useEffect, useState } from 'react';
import ProductsCard from './ProductsCard';

const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect( () =>{
        fetch('products.json')
        .then(res =>res.json())
        .then(data => setProducts(data))
    }, [])
    return (
        <div>
            <div className='text-center mb-4'>
                <p className="text-2xl font-bold text-orange-600">Popular Products</p>
                <h2 className="text-5xl font-semibold">Browse Our Products</h2>
                <p>The majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
            </div>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pl-9'>
            {/* {
                    products.map(product => <ProductsCard
                        key={product._id}
                        service={product}
                    ></ProductsCard>)
                } */}
            </div>
        </div>
    );
};

export default Products;