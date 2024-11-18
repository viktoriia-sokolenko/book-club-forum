import React from 'react';
import { useParams } from 'react-router-dom'
import { supabase } from '../client'
import { useState, useEffect } from 'react'

const EditPost = ({books, flags, userId}) => {
    const [message, setMessage] = useState('');
    const {post_id} = useParams();
    const [post, setPost] = useState({
        book: '',
        title: '',
        content: '',
        secret_key: '',
        flag: '',
      });
    const deletePost = async (event) => {
        event.preventDefault();
        const {error} = await supabase
            .from('posts')
            .delete()
            .eq('id', post_id); 
        if (error) {
            setMessage("Error deleting post");
        } else {
            window.location = `/posts/${userId}`;
        }
    }
    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select()
                .eq('id', post_id)
                .single();

            if (error) {
                setMessage("Error fetching posts.");
            } else {
                setPost(data);
                setMessage('');
            }
        };

        fetchPost();
    }, [post_id]);
    const updatePost = async (event) => {
        event.preventDefault();
      
        const { data, error }  = await supabase
                                        .from('posts')
                                        .update({book: post.book,
                                            title: post.title,
                                            content: post.content,
                                            secret_key: post.secret_key,
                                            flag: post.flag})
                                        .eq('id', post_id);
        if (error) {
        setMessage("Error updating post. Try again please.");
    } else {
        setMessage("Post updated successfully!");
    }
      }
      return (
        <div>
        <h1>Edit Post</h1>
        <form className = "Form">
          <input
            type="text" 
            placeholder="Post Title" 
            value={post.title}
            onChange={(e) => setPost((prev) => ({ ...prev, title: e.target.value }))}
            className = "input-name"
          />
          <input
            type="password" 
            placeholder="Secret Key (6-15 characters)"
            value={post.secret_key}
            onChange={(e) => setPost((prev) => ({ ...prev, secret_key: e.target.value }))}
            className = "input-name"
            minLength={6}
            maxLength={15}
          />
          <textarea 
            id="postContent" 
            name="postContent" 
            rows="8" 
            cols="50"
            value={post.content}
            onChange={(e) => setPost((prev) => ({ ...prev, content: e.target.value }))}
            placeholder="Post something..."
        ></textarea>
        <div>
        <select
            value={post.book}
            onChange={(e) => setPost((prev) => ({ ...prev, book: e.target.value }))}
        >
            <option value="">
            Choose a book
            </option>
            {books.map((book) => (
            <option key={book} value={book}>
                {book}
            </option>
            ))}
        </select>
        </div>
        <div className = "radio">
          {flags.map((flag) => (
          <label key={flag}>
            <input
              type="radio"
              name="flag"
              value={flag}
              checked={post.flag === flag}
              onChange={(e) => setPost((prev) => ({ ...prev, flag: e.target.value }))}
            />
            {flag}
          </label>
        ))}
        </div>
        <button type="submit" onClick={updatePost}>Update Post</button>
        </form>
        {message && <p>{message}</p>}
        <button onClick={deletePost}>Delete post</button>
        </div>
      )
}
export default EditPost