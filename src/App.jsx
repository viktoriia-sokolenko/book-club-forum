import { supabase } from './client'
import { useState, useEffect } from 'react'
import { useRoutes, Link } from 'react-router-dom'
import './App.css'
import AllPosts from './pages/AllPosts.jsx';
import MyPosts from './pages/MyPosts.jsx';
import EditPost from './pages/EditPost';
import AddPost from './pages/AddPost';
import ViewPost from './pages/ViewPost.jsx';
import Home from './pages/Home.jsx';


function App() {
  const books = ['Beartown', 'Normal People', 'The Vanishing Half', 'The Nightingale', 'Small Things Like This']
  const flags = ['Question', 'Opinion', 'Announcement'];
  const formatDate = (timestamp) => {
    const now = Date.now();
    const postTime = new Date(timestamp).getTime();
    const diffInMs = now - postTime; 
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInMinutes < 1) {
        return 'just now';
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
};
  const [userId, setUserId] = useState(() => localStorage.getItem('userId'));
  const [inputId, setInputId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const checkId = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('id', inputId);
  
      if (error) {
        alert('Error checking user ID: ' + error.message);
        return;
      }
  
      if (data.length === 1) {
        localStorage.setItem('userId', inputId);
        setUserId(inputId);
        setErrorMessage('');
      } else {
        setErrorMessage('User ID not found. Try again please.');
      }
    } catch (error) {
      alert('An error occurred while checking the user ID: ' + error.message);
    }
  };
  const createUser = async () => {
    const { data, error } = await supabase
      .from('users')
      .insert({})
      .select();
  
    if (error) {
      alert('Error creating new user. Please try again.');
    }
    else {
      const newUserId = data[0].id;
      localStorage.setItem('userId', newUserId);
      setUserId(newUserId);
    }
  };
  const logout = () => {
    localStorage.removeItem('userId');
    setUserId(null);
    window.location = `/`;
  };
  let element = useRoutes([
    {
      path: "/",
      element:<Home/>
    },
    {
      path: "/all",
      element:<AllPosts userId = {userId} books = {books} formatDate = {formatDate}/>
    },
    {
      path:"/edit/:post_id",
      element: <EditPost books = {books} flags = {flags} userId = {userId} formatDate = {formatDate}/>
    },
    {
      path:"/posts/:user_id",
      element: <MyPosts books = {books} flags = {flags} userId = {userId} formatDate = {formatDate}/>
    },
    {
      path:"/view/:post_id",
      element: <ViewPost userId = {userId} formatDate = {formatDate}/>
    },
    {
      path:"/new",
      element: <AddPost books = {books} flags = {flags} userId = {userId} formatDate = {formatDate}/>
    }
  ]);
  return (
    <div>
      {userId === null ?
      (
        <div>
          <h1>Welcome to our Book Community!</h1>
          <h2>Choose an option:</h2>
          <p>If you are a new user:</p>
          <button onClick={createUser}>Get my user ID</button>
          <p>Or if you are returning user</p>
          <form onSubmit={checkId}>
            <h3>Enter your user ID</h3>
            <input
              type="text"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
              placeholder="User ID"
              className={errorMessage ? 'input-name-2 error' : 'input-name-2'}
            />
            {errorMessage && <p>{errorMessage}</p>}
            <button type="submit">Submit</button>
          </form>
        </div>
      )
      :
      (<div className="App">
        <div className="menu">
          <h2>User ID: {userId} </h2>
          <Link to="/"><button className="sideButton"> Home  </button></Link>
          <Link to={`/posts/${userId}`}><button className="sideButton"> My Posts </button></Link>
          <Link to="/all"><button className="sideButton"> All Posts  </button></Link>
          <Link to="/new"><button className="sideButton"> Add Post </button></Link>
          <button onClick={logout}>Logout</button>
        </div>
          {element}
      </div>)
}
    </div>
  )
}

export default App