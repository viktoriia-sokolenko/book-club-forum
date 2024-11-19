import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import * as Unicons from '@iconscout/react-unicons'

const Card = ({ id, title, content, upvotes, flag, book, date }) => {
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
                    <h3>{title}</h3>
                    <div className="row">
                        {book && <h5>#{book}</h5>}
                        <h6>  | Posted {date}</h6>
                    </div>
                    <p className="preview">{content}</p>
                    <Link to={`/view/${id}`} key={id}>More...</Link>
                    
                </div>
                <div className="upvoteLine">
                    <button onClick={handleUpvote}>
                        {upvoted ? 
                        <Unicons.UilThumbsUp size="20" color="#004266"/>
                        :
                        <Unicons.UilThumbsUp size="20" color="#FFBC42"/>
                        }
                    </button>
                    <p>{postUpvotes}</p>
                </div>
                
        </div>

    )
}
export default Card;