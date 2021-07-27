import { NextApiRequest, NextApiResponse} from 'next';
import sqlite3 from 'sqlite3'
import { open } from "sqlite";
import { authenticated } from './people';

export default authenticated (async function getAllVehicle(req: NextApiRequest, res: NextApiResponse){
    
    const db = await open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });

    const vehicles = await db.all('select * from vehicle');
    res.json(vehicles); 
});