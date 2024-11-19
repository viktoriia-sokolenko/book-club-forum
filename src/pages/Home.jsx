import React from 'react'
import Books from '../assets/books.jpg'
const Home = () => {
    return (
        <div>
            <h2>Welcome to our Book Club</h2>
            <p>Here you can discuss the books we read and share your love for reading with others.</p>
            <img
                    src={Books}
                    alt={`A stack of books with a coffee cup on top`}
                />
        </div>
    )
}
export default Home