import fs from 'fs'

const db_path = "./database.dat"

let pets_db = [
    { name: "Max", species: "dog", ageMonths: 24, id: 1 }
];

createDatabaseIfNotExists();

export const create = (req) => {
    let id = Date.now();
    req["id"] = id
    pets_db.push(req);
    writeToFile()
    return id
}

export const list = () => {
    return pets_db;
}

export const remove = (id) => {
    let index = pets_db.findIndex(x => x.id === Number(id))
    if (index >= 0) {
        let deletedItem = pets_db.splice(index, 1);
        console.log(deletedItem)
        writeToFile()
        return deletedItem;
    }
}

export const removeOlder = () => {
    let count = 0
    let current = Date.now();
    let index = pets_db.findIndex(x => current - x.id > 1 * 60 * 1000);
    while(index >= 0){
        pets_db.splice(index, 1);
        index = pets_db.findIndex(x => current - x.id > 1 * 60 * 1000);
        count++;
    }
    writeToFile()
    return count
}

export const update = (petId, updates) => {
    let updatedPet = undefined;
    pets_db.filter(x => x.id === Number(petId)).forEach(x => {
        x["updates"] = updates
        updatedPet = x;
    })
    writeToFile();
    return updatedPet
}

function createDatabaseIfNotExists() {
    if (fs.existsSync(db_path)) {
        pets_db = JSON.parse(fs.readFileSync(db_path).toString())
        return;
    }
    writeToFile()
}

function writeToFile() {
    fs.writeFileSync(db_path, JSON.stringify(pets_db, null, 4))
}