import React, { useState } from "react";
import axios from "axios";

const Order = () => {
    const [amount, setAmount] = useState("");
    const [productId, setProductId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/pay", {
                amount,
                productId,
                successUrl: "http://localhost:3000/success",
                failureUrl: "http://localhost:3000/failure",
            });

            // Redirect to eSewa payment page
            window.location.href = response.request.responseURL;
        } catch (error) {
            console.error("Error initiating payment:", error);
        }
    };

    return (
        <div>
            <h2>Make Payment</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Product ID:</label>
                    <input
                        type="text"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Pay with eSewa</button>
            </form>
    </div>
  ) 
}

export default Order
