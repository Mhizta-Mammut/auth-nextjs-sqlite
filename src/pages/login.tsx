/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useRef } from "react"

const login = () => {

    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState(null);

    async function handleLogin(){
        const resp = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailRef.current?.value,
                password: passRef.current?.value
            }),
        });

        const json = await resp.json();
        setMessage(json);
    }
    return (
        <div>
            {JSON.stringify(message)}
            <input type="text" placeholder="email" ref={emailRef}/>
            <input type="password" placeholder="Password" ref={passRef}/>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default login
