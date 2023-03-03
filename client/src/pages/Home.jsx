import {useEffect,useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import Search from '../helper_components/Search';

const Home = (props)=>{
    const navigate = useNavigate();
    const user = props.User;
    const users = props.Users;
    const [userSet,setUserSet] = useState([]);

    const handleLogout = ()=>{
        fetch('/user',{
            method: 'DELETE'
        }).then(navigate('/login'));
    }
    useEffect(()=>{
        
    },[]);
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
                            </ul>
                        </nav>
                        <Search set={setUserSet} Find={users} result={userSet}/>
                        <h1>Home</h1>
                        <h1>Welcome, {user.fName} {user.lName}</h1>
                        <h3>Friends</h3>
                    </div>
                )
            }
        </>
    )
}

export default Home;
