import React from "react";
import { useState } from "react";
import { supabase } from '../client'
import * as Unicons from '@iconscout/react-unicons';


const Comment = ({ id, user_id, content, date, loggedIn, post_id}) => {
    const [message, setMessage] = useState('')
    const deleteComment = async (event) => {
        event.preventDefault();
        const {error} = await supabase
            .from('comments')
            .delete()
            .eq('id', id)
            .eq('post_id', post_id); 
        if (error) {
            setMessage("Error deleting comment");
        } else {
            window.location = `/edit/${post_id}`;
            setMessage('');
        }
    }
    return (
        <div className="row">
            <div className = "Comment">
                <h5>{user_id} posted {date}</h5>
                <p>{content}</p>  
            </div>
            {loggedIn && 
            <div>
            <button onClick={deleteComment} className="buttonIcon"><Unicons.UilTrash size="20" color="#00AF54"/></button>
            {message && <p>{message}</p>}
            </div>
            }
        </div>

    )
}
export default Comment;