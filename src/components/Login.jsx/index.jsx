import React from 'react'

const Login = () => {
  const handleLogin = () => {
    // Redirect the user to the GitHub login page
    window.location.href = 'http://localhost:5000/auth/github'; // Change the URL to your backend authentication route
  };

  const getData = async () => {
    // Fetch the data from the backend
    const res = await fetch('http://localhost:5000/user');

    console.log(res.status);

    if(res.status === 200){
      console.log('Success');

      const data = await res.json();
      console.log(data);
    }


  }

  return (
    <div>
      <button onClick={handleLogin}>
        Login with GitHub
      </button>


      <button onClick={getData}>Get User Data</button>
    </div>
  )
}

export default Login