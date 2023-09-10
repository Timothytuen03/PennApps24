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
    let data = {};
    // const {userObject} = useAuth();

    // if(userObject != null) {
    axios.get("http://localhost:4000/api/getArticles").then((res) => {
        data = res;
        console.log(res);
    }).catch((err) => {
        console.log(err);
    })
    // } else {
    //     data = false;
    // }
   
    // Pass data to the page via props
    return { props: { data } }
  }

function news({data}) {
    const router = useRouter();
    console.log(data);
    // useEffect(() => {
    //     if(data == false) {
    //         router.push('/');
    //     }
    // }, [data])
    if(data == false) router.push('/');
    

    return (
        <div>
            <p>news</p>
        </div>
    )
}

export default news;