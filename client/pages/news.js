import React, {useEffect, useState, useContext} from 'react'
import {useRouter} from "next/navigation";
import axios from "axios";
import useAuth from '@/context/useAuth';

export async function getServerSideProps() {
    // Fetch data from external API
    // let data = false;
    // const isAuth = axios.get("http://localhost:4000/api/getUser")

    // console.log("auth?: " + isAuth);
    // if(isAuth) {
    //     console.log("authenticated")
    //     axios.get("http://localhost:4000/api/getArticles").then((res) => {
    //         data = res;
    //         console.log(res);
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // }

    // const {userObject} = useAuth();

    // if(userObject != null) {
    // let data = [];
    // axios.get("http://localhost:4000/api/getArticles").then((res) => {
    //     // console.log(res)
        
    // }).catch((err) => {
    //     console.log("ERR: " + err);
    // })

    // axios.get("http://localhost:4000/api/getSimilarLast").then((res) => {
    //     data.push(res)
    //     console.log(res);
    // }).catch((err) => {
    //     console.log(err);
    // })
   
    // Pass data to the page via props
    // console.log(data)
    // return { props: { data } }

    const res = await fetch('http://localhost:4000/api/getArticles')
    const repo = await res.json()
    return { props: { repo } }
  }

function news({repo}) {
    /*const router = useRouter();
    console.log(data);
    useEffect(() => {
        if(data == false) {
            router.push('/');
        }
    }, [data])
    if(data == false) router.push('/');*/
    console.log(repo);
    console.log("result ^");
    
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center', 
        backgroundColor: 'lightblue',
        padding: '20px',
        borderRadius: '10px',
      };
    
    const boxStyle = {
    textAlign: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: 'white',
    marginBottom: '20px', 
    width: '50%', 
    };

    const centerStyle = {
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center'
      };

    return (
        <div style={containerStyle}>
            <div style={boxStyle}>
                <h1><b>News Customized Just for You! </b></h1>
            </div>
            {repo.map((entry) => (
                <div style={centerStyle}>
                    <div style={boxStyle}>
                        <h1><a href={entry.url}>{entry.title}</a></h1>
                    </div>
                    <div style={boxStyle}>
                        <p><b>{entry.description.slice(0, 50)}</b></p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default news;