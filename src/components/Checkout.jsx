import React, { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import { createOrder, updateProductStock, getNextOrderNumber } from '../firebase/ProductsData';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const Checkout = () => {
    const { cart, clearCart } = useContext(CartContext);
    const [customerData, setCustomerData] = useState({
        name: '',
        email: '',
        confirmEmail: '',
        phone: ''
    });
    const [orderId, setOrderId] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData({
            ...customerData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (customerData.email !== customerData.confirmEmail) {
            Swal.fire({
                icon: 'error',
                title: 'Emails do not match',
                text: 'Please make sure your emails are the same.',
                confirmButtonText: 'Try Again',
            });
            return;
        }

        const orderNum = `${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${await getNextOrderNumber()}`;

        const orderData = {
            customer: customerData,
            products: cart,
            orderNumber: orderNum,
            total: cart.reduce((total, item) => total + item.price * item.quantity, 0)
        };

        try {
            const orderId = await createOrder(orderData);
            setOrderId(orderId);

            // Update product stock
            await Promise.all(
                cart.map(async (item) => {
                    const newStock = item.stock - item.quantity; // Assuming `stock` is available in the item
                    await updateProductStock(item.id, newStock);
                })
            );

            Swal.fire({
                icon: 'success',
                title: 'Order registered successfully!',
                text: `Your order number is: ${orderId}`,
                confirmButtonText: 'OK',
            });
            clearCart();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error registering order',
                text: error.message || "An unexpected error occurred.",
                confirmButtonText: 'Try Again',
            });
        }
    };

    if (orderId) {
        return (
            <div className="container text-center">
                <h1 className="mt-4">Thank you for your purchase!</h1>
                <p>Your order number is: {orderId}</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">Checkout</h1>
            <form className="mt-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter your name"
                        value={customerData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={customerData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm Email</label>
                    <input
                        type="email"
                        name="confirmEmail"
                        className="form-control"
                        placeholder="Confirm your email"
                        value={customerData.confirmEmail}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        placeholder="Enter your phone"
                        value={customerData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className="btn btn-primary" type="submit">Purchase</button>
            </form>
        </div>
    );
};

export default Checkout;
