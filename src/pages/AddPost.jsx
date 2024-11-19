import React from 'react'
import '../App.css'
import { supabase } from '../client'
import { useState, useEffect } from 'react'
import { useRoutes, Link } from 'react-router-dom'

const AddPost = ({books, userId, flags, formatDate}) => {
    const [message, setMessage] = useState('')
    const [post, setPost] = useState({
      book: '',
      title: '',
      content: '',
      secret_key: '',
      flag: '',
    })
    const createPost = async (event) => {
        event.preventDefault();
        if (!post.title || !post.secret_key) {
            setMessage("Title and Secret Key are required.");
            return;
        }
        const { error } = await supabase
          .from('posts')
          .insert({
            user_id: userId,
            book: post.book,
            title: post.title,
            content: post.content,
            secret_key: post.secret_key,
            flag: post.flag,
            upvotes: 0,
          })
          .select();
      
          if (error) {
            setMessage("Error adding post. Try again please");
            console.log(error.message)
          } else {
            setMessage("Post was added successfully!");
            setPost({
                book: '',
                title: '',
                content: '',
                secret_key: '',
                flag: '',
            });
          }
      }
      return (
        <div>
        <h1>Add New Post</h1>
        <form className = "Form">
          <input
            type="text" 
            placeholder="Post Title" 
            value={post.title}
            onChange={(e) => {setPost((prev) => ({ ...prev, title: e.target.value }));
                            setMessage('');}}
            className = "input-name"
            required
          />
          <input
            type="password" 
            placeholder="Secret Key (6-15 characters)" 
            value={post.secret_key}
            onChange={(e) => setPost((prev) => ({ ...prev, secret_key: e.target.value }))}
            className = "input-name"
            minLength={6}
            maxLength={15}
            required
          />
          <textarea 
            id="postContent" 
            name="postContent" 
            rows="8" 
            cols="50"
            value={post.content}
            onChange={(e) => setPost((prev) => ({ ...prev, content: e.target.value }))}            
            placeholder="Post something...">
            </textarea>
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
        <button type="submit" onClick={createPost}>Post</button>
        </form>
        {message && <p>{message}</p>}
        </div>
      )
    }
    export default AddPost