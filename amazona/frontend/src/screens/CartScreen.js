import React from 'react'
import { useParams } from 'react-router-dom'

export default function CartScreen() {

    const params = useParams()
    const productId = params.id;
    const qty = params.qty ? Number(params.qty) : 1;
    return (
        <div>
            <h1>Cart Screen</h1>
            <p>ADD TO CART : ProductID: {productId}, Qty: {qty}</p>
        </div>
    )
}
