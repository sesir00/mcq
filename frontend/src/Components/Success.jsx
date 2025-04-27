import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Success = () => {
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const oid = queryParams.get("oid");
        const amt = queryParams.get("amt");
        const refId = queryParams.get("refId");

        console.log("Payment successful:", { oid, amt, refId });
        // You can send these details to your backend for verification
    }, [location]);

    return <h2>Payment Successful!</h2>;
};

export default Success;
