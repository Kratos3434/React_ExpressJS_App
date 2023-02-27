import {useEffect,useState} from 'react';
import {  Link,useNavigate } from 'react-router-dom';
import Search from '../helper_components/Search';

const Home = (props)=>{
    const navigate = useNavigate();
    const [user,setUser] = useState();
    const users = props.Users;
    const [userSet,setUserSet] = useState([]);
    const fetchUser = ()=>{
        fetch('/user').then(res=>res.json())
        .then(data=>setUser(data))
    }

    const handleLogout = ()=>{
        fetch('/user',{
            method: 'DELETE'
        }).then(navigate('/login'));
    }
    useEffect(()=>{
        fetchUser();
    },[])
    return(
        <>
            {
                (user === undefined || users === undefined)?
                (navigate('/login')):
                (
                    <div className='home'>
                        <nav className='navbar'>
                            <ul>
                                <li><button onClick={handleLogout}>Logout</button></li>
                                <li className='search'><Search set={setUserSet} Find={users} result={userSet}/></li>
                            </ul>
                        </nav>
                        <h1>Home</h1>
                        <h1>Welcome, {user.fName} {user.lName}</h1>
                        <h3>Friends</h3>
                        {
                            user.friends.map(e=>{
                                return <p>{e.fName} {e.lName}</p>
                            })
                        }
                    </div>
                )
            }
        </>
    )
}

export default Home;