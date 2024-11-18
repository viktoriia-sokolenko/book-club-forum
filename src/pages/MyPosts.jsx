import React from 'react';
import '../App.css'
import { supabase } from '../client'
import { useParams } from 'react-router-dom'
import Card from '../components/Card.jsx'
import { useState, useEffect } from 'react'


const MyPosts = () => {
    const {user_id} = useParams();
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const fetchPosts = async () => {
        const {data, error} = await supabase
          .from('posts')
          .select()
          .eq('user_id', user_id);
        if (error) {
            setError('Error fetching posts. Try updating the page.');
        } else {
            setPosts(data);
        }
    }
    useEffect(() => {
        fetchPosts();
    }, [user_id]);
    return (
        <div className = "PostsPage">
        <h2>My Posts</h2>
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
            {error && <p>{error}</p>}
        </div>
        </div>  
    )

}
export default MyPosts