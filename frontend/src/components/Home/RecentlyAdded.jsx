import React, { useEffect, useState } from 'react';
import axios from "axios";
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';

const RecentlyAdded = () => {
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://book-store-server-seven.vercel.app/api/v1/get-recent-books"
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
            <h4 className='text-3xl text-yellow-800'>Recently Added Books</h4>
            {!data && <div className="flex items-center justify-center my-8"><Loader/></div>}
            <div className='my-8 grid gird-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
            {data && data.map((book, index) => (
                <div key={index}>
                    <BookCard data={book}/>{" "}
                </div>
            ))}
            </div>
        </div>
    );
}

export default RecentlyAdded;
