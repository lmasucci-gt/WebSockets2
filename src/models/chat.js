import moment from 'moment';

export class Chat{
    constructor(email, mensaje){
        this.email = email,
        this.time = `${moment().format("L")} ${moment().format("LTS")}`,
        this.mensaje = mensaje
    }    
}

