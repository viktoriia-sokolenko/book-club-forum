import React from 'react';
import { useParams } from 'react-router-dom'
import { supabase } from '../client'
import { useState, useEffect } from 'react'

const EditPost = ({books, flags, userId}) => {
    const {id} = useParams();
    const [post, setPost] = useState({
        book: '',
        title: '',
        content: '',
        secret_key: '',
      });
    const deletePost = async (event) => {
        event.preventDefault();
        const {error} = await supabase
            .from('posts')
            .delete()
            .eq('id', passenger.id); 
        if (error) {
            alert("Error deleting passenger: " + error.message);
        } else {
            alert("Passenger deleted!");
            window.location = "/all";
        }
    }
    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select()
                .eq('id', id)
                .single();

            if (error) {
                alert("Error fetching posts:", error.message);
            } else {
                setPassenger(data);
            }
        };

        fetchPost();
    }, [id]);
    const updatePost = async (event) => {
        event.preventDefault();
      
        const { data, error }  = await supabase
                                        .from('Passengers')
                                        .update({book: post.book,
                                            title: post.title,
                                            content: post.content,
                                            secret_key: post.secret_key})
                                        .eq('id', id);
        if (error) {
        console.error("Error updating post:", error.message);
    } else {
        alert("Passenger updated!");
        window.location = "/all";
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
          />
          <textarea 
            id="postContent" 
            name="postContent" 
            rows="8" 
            cols="50" 
            placeholder="Content (optiional)">
                
            </textarea>
        <label>
        Book (optional):
        </label>
        <select
            value={post.book}
            onChange={(e) => setPost((prev) => ({ ...prev, book: e.target.value }))}
        >
            {books.map((book) => (
            <option key={book} value={book}>
                {book}
            </option>
            ))}
        </select>
        <div>
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
        <button type="submit" onClick={updatePost}>Submit</button>
        </form>
        <button onClick={deletePost}>Delete post</button>
        </div>
      )
}
export default EditPost