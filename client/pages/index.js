import React, { useEffect, useState } from 'react';
import axios from "axios";
import {useRouter} from "next/navigation";

function index() {
  const router = useRouter();
  const [newClient, setClient] = useState(true);

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [preference, setPreference] = useState();

  const signUp = () => {
    axios.post('http://localhost:4000/api/newUser', {
      username: email,
      number: phoneNumber,
      firstName: fName,
      lastName: lName,
      password: password,
      preference: preference
    }).then(res => {
      console.log(res)
      router.push('/news');
    }).catch(err => {
      console.log("failed request");
      console.log(err);
    })
  }

  const login = () => {
    axios.post('http://localhost:4000/api/login', {
      username: email,
      password: password
    }).then((res) => {
      console.log(res);
      router.push('/news')

    }).catch(err => {
      console.log("failed");
      console.log(err);
    })
  }

  const containerStyles = {
    backgroundColor: '#add8e6',
    padding: '40px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh'
  };

  const inputStyles = {
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px',
    width: '200px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  };

  const selectStyles = {
    ...inputStyles,
    width: '220px',
  };

  const labelInputContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '10px',
  };

  const labelStyles = {
    backgroundColor: '#7acaeb',
    padding: '5px 15px',
    borderRadius: '20px',
    color: 'white',
    fontWeight: 'bold',
  };

  const buttonStyles = {
    backgroundColor: '#7acaeb',
    color: 'white',
    border: '5px solid #64bbe3', 
    borderRadius: '5px',
    padding: '10px 20px',
    margin: '10px',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
    display: 'flex',
    alignContent: 'center'

  };

  const nameContainerStyles = {
    display: 'flex',
    gap: '20px',
  };

  return (
    <div style={containerStyles}>
      {newClient ?
      (<div>
        <div style={nameContainerStyles}>
          <div style={labelInputContainerStyles}>
            <label htmlFor='firstName' style={labelStyles}>
              First Name
            </label>
            <input
              type='text'
              name='firstName'
              value={fName}
              onChange={(e) => {
                setFName(e.target.value);
              }}
              style={inputStyles}
            />
          </div>
          <div style={labelInputContainerStyles}>
            <label htmlFor='lastName' style={labelStyles}>
              Last Name
            </label>
            <input
              type='text'
              name='lastName'
              value={lName}
              onChange={(e) => {
                setLName(e.target.value);
              }}
              style={inputStyles}
            />
          </div>
        </div>
        <div style={nameContainerStyles}>

            <div style={labelInputContainerStyles}>
              <label htmlFor='name' style={labelStyles}>
                Email
              </label>
              <input
                type='email'
                name='email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                style={inputStyles}
              />
            </div>
            <div style={labelInputContainerStyles}>
              <label htmlFor='number' style={labelStyles}>
                Number
              </label>
              <input
                type='text'
                name='number'
                value={phoneNumber}
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
                style={inputStyles}
              />
            </div>
          <div style={labelInputContainerStyles}>
            <label htmlFor='major' style={labelStyles}>
              Major
            </label>
            <select
              name='major'
              value={preference}
              onChange={(e) => {
                setPreference(e.target.value);
              }}
              style={selectStyles}
            >
              <option value='Aerospace Engineering'>Aerospace Engineering</option>
              <option value='Biology/Pre-Med'>Biology/Pre-Med</option>
              <option value='Computer Science'>Computer Science</option>
              <option value='Finance'>Finance</option>
              <option value='Political Science'>Political Science</option>
              <option value='Theater'>Theather</option>

            </select>
          </div>
        </div> 
          <button onClick={() => signUp()} style={buttonStyles}>
            Create Account
          </button>
          <button onClick={() => setClient(false)} style={buttonStyles}>Login</button>
        </div>
      )
      :
      (<div className='flex flex-col'>
        <label htmlFor='emailLog' style={labelStyles}>
          Email
        </label>
        <input
          type='text'
          name='emailLog'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          style={inputStyles}
        />
        <label htmlFor='passwordLog' style={labelStyles}>
          Password
        </label>
        <input
          type='password'
          name='passwordLog'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          style={inputStyles}
        />
        <button onClick={() => login()} style={buttonStyles}>
          Login
        </button>
        <button onClick={() => setClient(true)} style={buttonStyles}>Sign Up</button>
      </div>)}
    </div>

    // <div>
    //   <div className='flex flex-col'> 
    //     <label htmlFor='firstName'>First Name</label>
    //     <input type='text' name='firstName' value={fName} onChange={(e) => {setFName(e.target.value)}}/>
    //     <label htmlFor='lastName'>Last Name</label>
    //     <input type='text' name='lastName' value={lName} onChange={(e) => {setLName(e.target.value)}}/>
    //     <label htmlFor='name'>Email: </label>
    //     <input type='email' name='email' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
    //     <label htmlFor='mobileNumber'>Phone Number (SMS Available)</label>
    //     <input type='text' name='mobileNumber' value={phoneNumber} onChange={(e) => {setNumber(e.target.value)}}/>
    //     <label htmlFor='password'>Password</label>
    //     <input type='password' name='password' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
    //     <button onClick={() => signUp()}>Create Account</button>
    //   </div>
    //   <hr/>
    //   <div className='flex flex-col'>
    //     <label htmlFor='emailLog'>Email</label>
    //     <input type='text' name='emailLog' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
    //     <label htmlFor='passwordLog'>Password</label>
    //     <input type='password' name='passwordLog' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
    //     <button onClick={() => login()}> Login </button>
    //   </div>
    // </div>
  )
}

export default index