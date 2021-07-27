/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useRef } from "react"

const signup = () => {

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState(null);

    async function handleLogin(){
        const resp = await fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameRef.current?.value,
                email: emailRef.current?.value,
                password: passRef.current?.value
            }),
        });

        const json = await resp.json();

        setMessage(json);
    }
    return (
        <div>
            <h1>Create a new User!</h1>
            {JSON.stringify(message)}
            <input type="text" placeholder="name" ref={nameRef}/>
            <input type="text" placeholder="email" ref={emailRef}/>
            <input type="password" placeholder="Password" ref={passRef}/>
            <button onClick={handleLogin}>Sign Up</button>
        </div>
    )
}

export default signup;
