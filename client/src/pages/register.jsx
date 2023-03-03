import {useState} from "react";
import { useNavigate } from "react-router-dom";
const Register = (props)=>{
    const navigate = useNavigate();
    const users = props.users;
    const [fname,setFname] = useState('');
    const [lname,setLname] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [err,setErr] = useState(false);
    const handleSignup = (e)=>{
        e.preventDefault();
        for(let i =0;i<users.length;i++){
            if(users[i].username === username){
                setErr(true);
                return false;
            }
        }
        fetch('/api',{
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(
                {
                    "fName": fname,
                    "lName": lname,
                    "username": username,
                    "password": password
                }
            )
        }).then(res=>res.json()).then(data=>{
            props.setUsers(data);
            props.fetchD();
            navigate('/')
        })
    }
    return(
        <div className="register">
            <h1>Sign up</h1>
            <form onSubmit={handleSignup}>
                <label>First Name</label>
                <br></br>
                <input type='text' onChange={(e)=>setFname(e.target.value)} required></input>
                <br></br>
                <label>Last Name</label>
                <br></br>
                <input type='text' onChange={(e)=>setLname(e.target.value)} required></input>
                <br></br>
                <label>Username</label>
                <br></br>
                <input type='text' onChange={(e)=>setUsername(e.target.value)} required></input>
                {
                    (err)?
                    (<label className="invalidLogin"> *Username is already taken</label>):
                    (<></>)
                }
                <br></br>
                <label>Password</label>
                <br></br>
                <input type='password' onChange={(e)=>setPassword(e.target.value)} required></input>
                <br></br><br></br>
                <input type='submit' value='Sign up'></input>
            </form>
        </div>
    )
}

export default Register;
