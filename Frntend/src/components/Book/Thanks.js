import React from "react";
import { Link } from "react-router-dom";

const Thanks = () => {
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='text-center'>
                <h1 className='text-4xl font-bold mb-4'>Thank You!</h1>
                <p className='text-lg mb-8'>Your order has been successfully booked.</p>

                <Link
                    to='/OrderHistory'
                    className='mt-16 bg-red-500 text-white py-2 px-4 rounded'
                >
                    View Order History
                </Link>
            </div>
        </div>
    );
};

export default Thanks;