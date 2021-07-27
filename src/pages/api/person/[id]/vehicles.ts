import { NextApiRequest, NextApiResponse} from 'next';
import sqlite3 from 'sqlite3'
import { open } from "sqlite";

export default async function getAllVehicleByPersonId(req: NextApiRequest, res: NextApiResponse){

    const db = await open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });

    const vehicles = await db.all('select * from vehicle where ownerId = ?', [req.query.id])
    res.json(vehicles);

}