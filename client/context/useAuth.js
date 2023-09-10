import { createContext, useState, useContext } from "react";
import axios from "axios";
import {useEffect} from "react";

export const AuthContext = createContext({});

export function AuthProvider({children}) {
    const [userObject, setUserObject] = useState(false);

    useEffect(() => {
        // withCredentials makes sure axios passes cookies from browser to the server
        axios.get("http://localhost:4000/getUser", { withCredentials: true }).then(res => {
            console.log(res);
            if(res.data) {
                console.log("setting data")
                console.log(res.data)
                setUserObject(res.data._id);
            }   
        }).catch(err => console.log(err))
    }, []);


    return(
        <AuthContext.Provider value={{userObject}}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    // return useContext(AuthContext);
}