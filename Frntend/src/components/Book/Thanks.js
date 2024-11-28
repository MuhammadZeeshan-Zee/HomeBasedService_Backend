import React from "react";

const Thanks = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
                <p className="text-lg">Your order has been successfully booked.</p>
                <button
                    onClick={() => window.location.href = "/"}
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default Thanks;
