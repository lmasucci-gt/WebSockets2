import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


export class File{
    constructor(file){
        this.file = `${__dirname}/chat.txt`
    }
    //TODO: Volver a poner asincronia a esto
    read(){
        try{
            const mensajes = fs.readFileSync(this.file, 'utf-8');
            return JSON.parse(mensajes);
        } catch (err){
            console.log(err);
            return [];
        }
    }
    //TODO: Volver a poner asincronia a esto
    create(mensaje){
        const mensajes = this.read();
        mensajes.push(mensaje);
        try{
            fs.writeFile(this.file, JSON.stringify(mensajes, null, '\t'), () => {});
            return mensaje;
        }
        catch (err){
            console.log(err);
            return err;
        }
    }
}

export default new File('chat.txt');