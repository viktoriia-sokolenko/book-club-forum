import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import UpvoteIcon from '../assets/upvote.jpg'
import UpvotedIcon from '../assets/upvoted.jpg'

const Card = ({ id, title, content, upvotes, flag, book }) => {
    const [postUpvotes, setPostUpvotes] = useState(upvotes)
    const [upvoted, setUpvoted] = useState(false);
    const handleUpvote = async () => {
        if (!upvoted) {
            setUpvoted(!upvoted);
        }
        const { error }  = await supabase
                                        .from('posts')
                                        .update({upvotes: (postUpvotes + 1)})
                                        .eq('id', id);
        if (error) {
        console.error("Error updating post:", error.message);
        }
        else {
            setPostUpvotes (postUpvotes + 1)
        }
    };
    return (
        <div className = "Card">
                <div className="">
                    <span className={`${flag}Flag`}>{flag}</span>
                    <h5>{title}</h5>
                    <h5>{book}</h5>
                    <p className="preview">{content}</p>
                    <Link to={`/view/${id}`} key={id}>More...</Link>
                    
                </div>
                <div className="upvoteLine">
                    <button onClick={handleUpvote}>
                        <img 
                            className = "icons"
                            src={upvoted ? UpvotedIcon : UpvoteIcon}
                            alt={`Upvote Icon`}
                        />
                    </button>
                    <p>{postUpvotes}</p>
                </div>
                
        </div>

    )
}
export default Card;