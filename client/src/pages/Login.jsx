import {useState} from 'react';
import { useNavigate,Link } from 'react-router-dom';

const Login = (props)=>{
    const users = props.users;
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [err,setErr] = useState(false);
    const navigate = useNavigate();
    const handleLogin = (e)=>{
        e.preventDefault();
        users.map((e)=>{
            if(e.username === username && e.password === password)
                fetch('/user',{
                    method: "POST",
                    headers: {'Content-type':'application/json'},
                    body: JSON.stringify({
                        "user":e
                    })
                }).then(navigate('/'));
        })
        setErr(true);
    }
    return(
        <>
            {
                (users.length === 0)?
                (<h1>Loading........</h1>):
                (
                    <div className='login'>
                        <h1>Log in</h1>
                        <p>Users: {users.length}</p>
                        {
                            (err)?(<p className='invalidLogin'>*Invalid username or password</p>):(<></>)
                        }
                        <form onSubmit={handleLogin}>
                            <label>Username</label>
                            <br></br>
                            <input type='text' onChange={(e)=>setUsername(e.target.value)}></input>
                            <br></br>
                            <label>Password</label>
                            <br></br>
                            <input type='password' onChange={(e)=>setPassword(e.target.value)}></input>
                            <br></br><br></br>
                            <input type='submit' value='Log in'></input>
                        </form>
                        <p>Don't have an account yet? <Link to='/signup'>Sign up</Link></p>
                    </div>
                )
            }
        </>
    )
}

export default Login;