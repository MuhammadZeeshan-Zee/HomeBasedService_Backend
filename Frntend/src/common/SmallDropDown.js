import React from 'react'
import { Link } from 'react-router-dom'

const SmallDropDown = ({ array }) => {
    return (
        <>
            <div className="absolute mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                {array.map((data, index) => (
                    <Link to={data.url} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {data.name}
                    </Link>
                ))}

            </div>
        </>
    )
}

export default SmallDropDown