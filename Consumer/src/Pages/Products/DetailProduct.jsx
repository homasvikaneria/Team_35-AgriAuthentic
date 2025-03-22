import React, { useEffect, useState } from 'react'
import ProductDetail from '../../components/ProductDetail'
import Navbar from '../Header/Navbar'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const DetailProduct = () => {

    const { product_id } = useParams()
    const [myProduct, setMyProduct] = useState(undefined)

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:4009/product/${product_id}`);
            console.log(response.data.data)
            if (response.data.success) {
                setMyProduct(response.data.data);
                console.log(response.data.data)
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            // setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchProduct()
    }, [])
    return (
        <>
            <Navbar />

            <ProductDetail
                product={{
                    id: 3,
                    name: myProduct?.productName,
                    farm: myProduct?.harvestLocation,
                    price: Number(myProduct?.productPrice),
                    unit: 'kg',
                    rating: 4.9,
                    level: 2,
                    image: myProduct?.imageLink,
                    description: myProduct?.productDescription,
                    origin: 'Kashmir, India',
                    certification: ['USDA Organic', 'Local Farm'],
                    harvestDate: myProduct?.harvestDate,
                    shelfLife: '3-4 weeks when refrigerated'
                }} />


        </>

    )
}

export default DetailProduct