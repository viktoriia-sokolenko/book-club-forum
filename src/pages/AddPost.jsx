import React from 'react'
import '../App.css'
import { supabase } from '../client'
import { useState, useEffect } from 'react'
import { useRoutes, Link } from 'react-router-dom'

const AddPost = ({books, userId, flags}) => {
    const [post, setPost] = useState({
      book: '',
      title: '',
      content: '',
      secret_key: '',
    })
    const createPost = async (event) => {
        event.preventDefault();
        const { error } = await supabase
          .from('posts')
          .insert({
            user_id: userId,
            book: post.book,
            title: post.title,
            content: post.content,
            secret_key: post.secret_key,
          })
          .select();
      
          if (error) {
            alert("Error adding post: " + error.message);
          } else {
            alert("Post added!");
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
            onChange={(e) => setPost((prev) => ({ ...prev, title: e.target.value }))}
            className = "input-name"
          />
          <textarea 
            id="postContent" 
            name="postContent" 
            rows="8" 
            cols="50" 
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
        </div>
      )
    }
    export default AddPost