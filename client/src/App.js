import {useEffect,useState} from 'react';
import {BrowserRouter, Routes,Route,useParams} from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/register';
import Profile from './pages/Profile';
import './App.css'

const App = ()=>{
    const [users,setUsers] = useState([]);
    const {name} = useParams();
    const fetchData = ()=>{
        fetch("/api").then(res=>res.json()).then((data)=>{
            setUsers(data);
        })
    }
    useEffect(()=>{
        fetchData();
    },[]);
    return (
        <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Layout/>}>
                <Route exact index element={<Home Users={users}/>}/>
                <Route path='login' element={<Login users={users}/>}/>
                <Route path='signup' element={<Register setUsers={setUsers} fetchD={fetchData} users={users}/>}/>
                <Route path='/:name' element={<Profile  param={name} users={users}/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
    )
}

export default App;