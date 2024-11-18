import React from "react";
import { supabase } from '../client'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const ViewPost = () => {
    const {post_id} = useParams();
    const [post, setPost] = useState({
        book: '',
        title: '',
        content: '',
        user_id: '',
        date: '',
    });
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
    };
    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select()
                .eq('id', post_id)
                .single();

            if (error) {
                alert("Error fetching post:", error.message);
            } else {
                setPost({book: data.book, 
                        title: data.title, 
                        content: data.content, 
                        user_id: data.user_id, 
                        date: formatDate(data.created_at)});
            }
        };
        fetchPost();
    }, [post_id]);
    return (
        <div className = "ViewPost">
            {/* <img 
            className = "icons"
            src={passenger.seat=='driver' ? Driver : Passenger}
            alt={`Person Icon`}
        /> */}
            <div className="post-info">
                <h3>{post.title}</h3>
                <h6>{post.user_id}</h6>
            </div>
            <h5>Posted on {post.date} </h5>
            <p>{post.content}</p>
            <Link to={`/edit/${post_id}`} key={post_id}> Edit</Link>
        </div>
    )
}
export default ViewPost