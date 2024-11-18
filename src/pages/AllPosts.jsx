import React from 'react';
import '../App.css'
import { supabase } from '../client'
import Card from '../components/Card.jsx'
import { useState, useEffect } from 'react'


const AllPosts = () => {
    const [posts, setPosts] = useState({})
    const [orderBy, setOrderBy] = useState('created_at')
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
        <h2>Discussion Posts</h2>
        <div className="AllPosts">
            {
                posts && posts.length > 0 ?
                posts.map((post) => 
                   <Card 
                        key={post.id} 
                        id={post.id} 
                        title={post.title}
                        content={post.content} 
                        book={post.book}
                        upvotes={post.upvotes}
                        flag = {post.flag}/>
                ) : <h3>{'No posts yet'}</h3>
            }
        </div>
        </div>  
    )

}
export default AllPosts