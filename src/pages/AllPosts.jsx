import React from 'react';
import '../App.css'
import { supabase } from '../client'
//import Card from '../components/Card.jsx'
import { useState, useEffect } from 'react'


const AllPosts = () => {
    const [posts, setPosts] = useState({})
    const fetchPosts = async () => {
        const {data} = await supabase
          .from('posts')
          .select();
      
        setPosts(data)
    }
    useEffect(() => {
        fetchPosts();
    }, []);
    return (
        <div className = "PassengersPage">
        <h2>All Passengers</h2>
        {/* <div className="AllPassengers">
            
            {
                posts && posts.length > 0 ?
                posts.map((post) => 
                   <Card 
                        key={post.id} 
                        id={passenger.id} 
                        name={passenger.name} 
                        arrival={passenger.arrival} 
                        seat={passenger.preferred_seat}
                        license={passenger.license}
                        destination = {passenger.destination}/>
                ) : <h3>{'Add passengers please'}</h3>
            }
        </div> */}
        </div>  
    )

}
export default AllPosts