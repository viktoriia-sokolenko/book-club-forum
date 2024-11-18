import React from 'react';
import '../App.css'
import { supabase } from '../client'
import { useParams } from 'react-router-dom'
//import Card from '../components/Card.jsx'
import { useState, useEffect } from 'react'


const MyPosts = () => {
    const {user_id} = useParams();
    const [posts, setPosts] = useState({})
    const fetchPosts = async () => {
        const {data} = await supabase
          .from('posts')
          .eq('user_id', user_id)
          .select();
      
        setPosts(data)
    }
    useEffect(() => {
        fetchPosts();
    }, []);
    return (
        <div className = "PassengersPage">
        <h2>All Passengers</h2>
        <div className="AllPosts">
            {
                posts && posts.length > 0 ?
                posts.map((post) => 
                   <Card 
                        key={post.id} 
                        id={post.id} 
                        title={post.title} 
                        arrival={passenger.arrival} 
                        book={post.book}
                        upvotes={post.upvotes}
                        flag = {post.flag}/>
                ) : <h3>{'Add passengers please'}</h3>
            }
        </div>
        </div>  
    )

}
export default MyPosts