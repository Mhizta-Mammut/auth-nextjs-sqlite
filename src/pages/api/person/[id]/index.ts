import { NextApiRequest, NextApiResponse} from 'next';
import sqlite3 from 'sqlite3'
import { open } from "sqlite";

export default async function getPersonById(req: NextApiRequest, res: NextApiResponse){
    
    const db = await open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });

    if(req.method === 'PUT'){
        const stmt = await db.prepare(
            'UPDATE person SET name = ?, email = ? where id = ?'
        );
        const result = await stmt.run(
            req.body.name, 
            req.body.email, 
            req.query.id
        );

        result;
    }

    const person = await db.get('select * from person where id = ?', [req.query.id])
    res.json(person);
}