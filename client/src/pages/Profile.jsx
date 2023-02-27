import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = (props) =>{
    const navigate = useNavigate();
    const users = props.users;
    const [user,setUser] = useState();
    const name = props.param;
    const setU = ()=>{
        users.map(e=>{
            let full = e.fName + e.lName;
            console.log(props.param)
            if(full == name)
                setUser(e);
        })
    }
    useEffect(()=>{
        setU();
    },[]);
    return(
        <div className="profile">
            <p>{users.length}</p>
            <p>{name}</p>
            {
                (props.param === '')?
                (navigate('/')):
                (
                    (user === undefined)?
                    (<h1>Loading......</h1>):
                    (
                        <h1>{user.fName}</h1>
                    )
                )
            }
        </div>
    )
}

export default Profile;