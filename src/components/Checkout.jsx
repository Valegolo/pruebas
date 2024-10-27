import React, { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import { createOrder, updateProductStock, getNextOrderNumber } from '../firebase/ProductsData';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Importa el hook

const Checkout = () => {
    const { cart, clearCart } = useContext(CartContext);
    const [customerData, setCustomerData] = useState({
        name: '',
        email: '',
        confirmEmail: '',
        phone: ''
    });
    const [orderId, setOrderId] = useState("");
    const [orderSummary, setOrderSummary] = useState([]);
    const navigate = useNavigate(); // Inicializa el hook

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
            const newOrderId = await createOrder(orderData);
            setOrderId(newOrderId); // Save the order ID

            // Update product stock
            await Promise.all(
                cart.map(async (item) => {
                    const newStock = item.stock - item.quantity; // Assuming `stock` is available in the item
                    await updateProductStock(item.id, newStock);
                })
            );

            // Set order summary with cart details
            setOrderSummary(cart);

            Swal.fire({
                icon: 'success',
                title: 'Order registered successfully!',
                confirmButtonText: 'OK',
            }).then(() => {
                clearCart(); // Clear the cart after the alert is closed
            });
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
        const total = orderSummary.reduce((sum, item) => sum + item.price * item.quantity, 0); // Calculate total

        return (
            <div className="container text-center" >
                <h1 className="mt-4">Gracias por tu compra!</h1>
                <p>Tu numero de Orden es: {orderId}</p>
                <h2 className="mt-4">Detalles de Compra</h2>
                <div className="row">
                    {orderSummary.length > 0 ? (
                        orderSummary.map((item) => (
                            <div className="col-md-4 mb-4" key={item.id}>
                                <div className="card"style={{ border: '2px solid teal', padding: 30 }}>
                                    <img src={item.image} className="card-img-top" alt={item.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">Valor: ${item.price}</p>
                                        <p className="card-text">Cantidad: {item.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay Items.</p>
                    )}
                </div>
                <h3>Total: ${total}</h3> {/* Mostrar el total calculado */}
                <button 
                    className="btn btn-info mt-4"
                    onClick={() => navigate('/')} // Redirigir al home
                >
                    Seguir Comprando 
                </button>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">Checkout</h1>
            <form className="mt-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
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
                    <label className="form-label">Celular</label>
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
                <button className="btn btn-primary" type="submit">Comprar</button>
            </form>
        </div>
    );
};

export default Checkout;
