const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function openDB (){
    return open({
        filename : './mydb.sqlite',
        driver: sqlite3.Database
    })
}
async function setup() {
    const db = await openDB();
    await db.migrate({
        migrationsPath: './migrations',
        force: 'last'
    });

    const people = await db.all('SELECT * FROM person');
    console.log('ALL PEOPLE', JSON.stringify(people, null, 2));

    const vehicles = await db.all('SELECT * FROM vehicle');
    console.log('ALL VEHICLES', JSON.stringify(vehicles, null, 2))
}

setup();