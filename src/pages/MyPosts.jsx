import React from 'react';
import '../App.css'
import { supabase } from '../client'
import { useParams } from 'react-router-dom'
import Card from '../components/Card.jsx'
import { useState, useEffect } from 'react'


const MyPosts = ({formatDate, books}) => {
    const {user_id} = useParams();
    const [posts, setPosts] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [selectedBook, setSelectedBook] = useState('');
    const [flagFilters, setFlagFilters] = useState ({
        Question: true, Announcement: true, Opinion: true
    })
    const [filteredPosts, setFilteredPosts] = useState([])
    const [sortCriteria, setSortCriteria] = useState({order: 'created_at', descending: true});
    const handleCheckboxChange = (flag) => {
        setFlagFilters((prev) => ({
          ...prev,
          [flag]: !prev[flag],
        }));
      };
    useEffect(() => {
        const fetchPosts = async (orderBy, ascending) => {
            const {data} = await supabase
              .from('posts')
              .select()
              .eq('user_id', user_id)
              .order(orderBy, { ascending: ascending });
          
            setPosts(data);
        }
        fetchPosts(sortCriteria.order, !sortCriteria.descending);
    }, [user_id, sortCriteria]);
    useEffect(() => {
        if (posts) {
          const filteredData = posts.filter((post) => {
            const matchesFlag = Object.entries(flagFilters).some(
                ([flag, isChecked]) => isChecked && (post.flag === flag || post.flag === "")
              );
            if (!matchesFlag) return false;
            if (selectedBook != "" && post.book != selectedBook){
                return false;
            }
            if (searchInput === "") {
              return true;
            }
            return post.title.toLowerCase().includes(searchInput.toLowerCase());
          });
      
          setFilteredPosts(filteredData);
        }
      }, [searchInput, selectedBook, flagFilters, posts, user_id]);
    return (
        <div>
        <h2>My Posts</h2>
        <div className = "Filters">
            <input
                type="text"
                placeholder="Search by keywords"
                className='input-name'
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <select
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
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
            <div className = "row">
                {Object.entries(flagFilters).map(([flag, isChecked]) => (
                    <div key={flag}>
                        <label>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleCheckboxChange(flag)}
                            className='input-check'
                        />
                        {flag}
                        </label>
                    </div>
                    ))}
            </div>
            <select
                value={sortCriteria.order}
                onChange={(e) => setSortCriteria((prev) => ({ ...prev, order: e.target.value }))}
                className='input-name'
            >
                <option value="created_at">
                Sort by created time
                </option>
                <option value="upvotes">
                Sort by upvotes
                </option>
            </select>
            <label>
                <input
                    type="checkbox"
                    checked={sortCriteria.descending}
                    className = "input-check"
                    onChange={(e) => setSortCriteria((prev) => ({ ...prev, descending: e.target.checked }))}
                />
                Descending?
            </label>
        </div>
        <div className="AllPosts">
            {
                filteredPosts && filteredPosts.length > 0 ?
                filteredPosts.map((post) => 
                   <Card 
                        key={post.id} 
                        id={post.id} 
                        title={post.title}
                        content={post.content} 
                        book={post.book}
                        upvotes={post.upvotes}
                        flag = {post.flag}
                        date = {formatDate(post.created_at)}/>
                ) : <h3>No posts yet</h3>
            }
        </div>
        </div>  
    )

}
export default MyPosts