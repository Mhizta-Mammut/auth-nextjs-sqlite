import { NextApiRequest, NextApiResponse} from 'next';
import sqlite3 from 'sqlite3'
import { open } from "sqlite";
import { compare } from 'bcrypt';
import { sign } from "jsonwebtoken";
import cookie from "cookie";

import { secret } from '../../../api/secret';

export default async function login(req: NextApiRequest, res: NextApiResponse){
    
    const db = await open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });

    if(req.method === 'POST'){

        const person = await db.get('select * from person where email = ?', [req.body.email]);

        compare(req.body.password, person.password, function(err, result){
            if(!err && result){
                const claims = { sub: person.id, personEmail: person.email };
                const jwt = sign(claims, secret, { expiresIn: '1h'})
                
                // Setting Cookie to our login API.
                res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'strict',
                    maxAge: 3600,
                    path: '/'
                }));

                res.json({message: "Welcome back to the App!"});
            }else{
                res.json({message: 'Oops! Something went wrong'})
            }
        }); 

    }else{
        res.status(405).json({message: 'We only support POST method'})
    }

    
}