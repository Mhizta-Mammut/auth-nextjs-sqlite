import { NextApiRequest, NextApiResponse} from 'next';
import sqlite3 from 'sqlite3'
import { open } from "sqlite";
import { hash } from 'bcrypt';

export default async function signup(req: NextApiRequest, res: NextApiResponse){
    
    const db = await open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });

    if(req.method === 'POST'){

        hash(req.body.password, 10, async function(err, hashed){

            const stmt = await db.prepare(
                'INSERT INTO person (name, email, password) VALUES (?, ?, ?)'
            );
            const result = await stmt.run(
                req.body.name, 
                req.body.email, 
                hashed
            );

            const person = await db.all('select * from person');
            res.json(person);
        });
    }else{
        res.status(405).json({message: 'We only support POST method'})
    }

    
}