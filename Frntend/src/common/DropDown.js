import React from 'react'
import { Link } from 'react-router-dom'

const DropDown = ({ array }) => {
    return (
        <div className="absolute top-8 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20 hidden group-hover:block">
            {array.map((data, index) => (
                <Link
                 
                    key={index} // or use key={data.id} if data has a unique id
                    to={data.url} 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    {data && data.name}
                </Link>
            ))}
        </div>
    )
}

export default DropDown
