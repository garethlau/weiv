import React, {useState} from 'react';
import Home from './Home';
import {useHistory} from 'react-router-dom';
import axios from 'axios';


export default function HomeContainer() {
    const history = useHistory();
    const [code, setCode] = useState("");
    
    function onChange(e) {
        console.log(e.target.value);
        setCode(e.target.value);
    }
    
    function enterRoom() {
        console.log(history);
        console.log(code);
        history.push(`/r/${code}`);
    }

    function createRoom() {
        axios.get("/api/get-code").then(response => {
            console.log(response);
            if (response.status === 200) {
                history.push(`/r/${response.data.code}`);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return <Home
        code={code}
        onChange={onChange}
        enterRoom={enterRoom}
        createRoom={createRoom}
    />
}