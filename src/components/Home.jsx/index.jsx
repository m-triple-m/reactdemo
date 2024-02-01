import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

const Home = () => {

  const { githubusername } = useParams();

  console.log(githubusername);

  const getGithubData = async () => {
    const res = await fetch(`http://localhost:5000/user/${githubusername}`);

    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
    }
  }

  useEffect(() => {
    if (githubusername)
      getGithubData();
  }, []);


  return (
    <div>
      <h1>Home Page</h1>
    </div>
  )
}

export default Home