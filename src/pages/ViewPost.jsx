import React from "react";
import { supabase } from '../client'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Comment from '../components/Comment.jsx'
import * as Unicons from '@iconscout/react-unicons'

const ViewPost = ({userId, formatDate}) => {
    const {post_id} = useParams();
    const [post, setPost] = useState({
        book: '',
        title: '',
        content: '',
        user_id: '',
        date: '',
        upvotes: 0,
    });
    const [comment, setComment] = useState({
        user_id: userId,
        post_id: post_id,
        content: '',
    })
    const [comments, setComments] = useState([]);
    const [keyError, setKeyError] = useState(false);
    const [editAttempt, setEditAttempt] = useState(false);
    const [message, setMessage] = useState('');
    const [inputKey, setInputKey] = useState('');
    const [upvoted, setUpvoted] = useState(false);
    const handleUpvote = async () => {
        if (!upvoted) {
            setUpvoted(!upvoted);
        }
        const { error }  = await supabase
            .from('posts')
            .update({upvotes: (post.upvotes + 1)})
            .eq('id', post_id);
        if (error) {
        setMessage("Error upvoting post");
        }
        else {
            setPost((prev) => ({ ...prev, upvotes: (post.upvotes + 1)}))
        }
    };
    const verifyKey = async (event) => {
        event.preventDefault();
        if (!editAttempt) {
            console.log(editAttempt);
            setEditAttempt(true);
            return;
        }
        try {
            const { data, error } = await supabase
              .from('posts')
              .select('id')
              .eq('secret_key', inputKey)
                .eq('id', post_id);
        
            if (error) {
              setMessage('Error checking post key. Try again please.');
              setKeyError(true);
              return;
            }
        
            if (data.length === 1) {
              setMessage('');
              setKeyError(false);
              window.location = `/edit/${post_id}`;
            } else {
              setMessage('The key is incorrect. Try again please.');
              setKeyError(true);
            }
          } catch (error) {
            setMessage('An error occurred while checking the post key. Try again please.');
            setKeyError(true);
          }
        };
    const addComment = async (event) => {
        event.preventDefault();
        const { error } = await supabase
          .from('comments')
          .insert({
            user_id: comment.user_id,
            content: comment.content,
            post_id: comment.post_id,
          })
          .select();
      
          if (error) {
            setMessage("Error adding comment. Try again please");
            console.log(error.message);
          } else {
            setComment((prev) => ({ ...prev, content: '' }));
            setMessage('');
            window.location = `/view/${post_id}`;
          }
      }
    useEffect(() => {
        const fetchComments = async () => {
            const {data, error} = await supabase
              .from('comments')
              .select()
              .eq('post_id', post_id);
            if (error) {
                setMessage('Error fetching comments. Try updating the page.');
            } else {
                setComments(data);
            }
        };
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select()
                .eq('id', post_id)
                .single();

            if (error) {
                setMessage("Error fetching post.");
            } else {
                setMessage('');
                setPost({book: data.book, 
                        title: data.title, 
                        content: data.content, 
                        user_id: data.user_id, 
                        date: formatDate(data.created_at), 
                        upvotes: data.upvotes});
            }
        };
        fetchPost();
        fetchComments();
    }, [post_id]);
    return (
        <div className = "ViewPost">
            <h5>{post.user_id} | Posted {post.date}</h5>
            <div className="row">
                <h2>{post.title}</h2>
                <form className = "Form-row">
            {editAttempt &&
            <div className="SecretKey">
            <input
              type="text"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Enter the post key"
              className={keyError ? 'input-name error' : 'input-name'}
            />
            <button onClick={() => {setEditAttempt(false); setMessage('')}} className="buttonIcon"><Unicons.UilEyeSlash size="20" color="#00AF54"/></button>
            </div>
            }
            <button onClick={verifyKey} className="buttonIcon"><Unicons.UilEdit size="20" color="#00AF54"/></button>
            </form>
            </div>
            {post.book && <h4>#{post.book}</h4>}
            <p>{post.content}</p>
            <div className="upvoteLine">
                <button onClick={handleUpvote}>
                    {upvoted ? 
                    <Unicons.UilThumbsUp size="20" color="#004266"/>
                    :
                    <Unicons.UilThumbsUp size="20" color="#FFBC42"/>
                    }
                </button>
                <p>{post.upvotes}</p>
            </div>
            <div className="Comments">
            {
                comments && comments.length > 0 ?
                comments.map((comment) => 
                <Comment key = {comment.id}
                        id = {comment.id} 
                        date = {formatDate(comment.created_at)} 
                        content = {comment.content} 
                        user_id = {comment.user_id}
                        post_id = {comment.post_id}
                        loggedIn = {false}/>
                ) : <p> No comments</p>
            }
        </div>
            <form className = "Form">
                <textarea 
                    id="commentContent" 
                    name="commentContent" 
                    rows="4" 
                    cols="50"
                    value={comment.content}
                    onChange={(e) => setComment((prev) => ({ ...prev, content: e.target.value }))}            
                    placeholder="Comment something...">
                </textarea>
                <button type="submit" onClick={addComment}>Post</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}
export default ViewPost