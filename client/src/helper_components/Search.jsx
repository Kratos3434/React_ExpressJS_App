import {useState} from "react";

const Search = (props)=>{
    const [searchTerm,setSearchTerm] = useState();
    return(
        <div>
            <input placeholder='Search people you know'
                value={searchTerm} 
                onChange={e=>setSearchTerm(e.target.value)}
                onKeyUp={e=>{
                    props.set(props.Find.filter(e=>{
                        let fullName = e.fName + ' ' + e.lName;
                        return fullName.toUpperCase().includes(searchTerm.toUpperCase()) && searchTerm !== '' && searchTerm !== ' ' ;
                    }))  
                }}
                autoComplete='on' list='suggestions'
            >
            </input>
            {
                (props.result === 0)?
                (<></>):
                (
                    <div>
                        <datalist id="suggestions">
                        {
                            props.result.map(e=>{
                                return <option value={e.fName + ' ' + e.lName}></option>
                            })
                        }
                    </datalist>
                    </div>
                )
            }
        </div>
    )
}

export default Search;