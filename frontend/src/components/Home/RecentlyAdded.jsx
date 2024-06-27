import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecentlyAdded = () => {
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:1000/api/v1/get-recent-books"
                );
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='mt-8 px-4'>
            <h4 className='text-3xl text-yellow-100'>Recently Added Books</h4>
            
            {data && data.map((book, index) => (
                <div key={index}>
                    <p>{book.title}</p>
                    <p>{book.author}</p>
                </div>
            ))}
        </div>
    );
}

export default RecentlyAdded;
