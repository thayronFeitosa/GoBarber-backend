import {uuid} from 'uuidv4'

class Appontiment {

    id: string;

    provider: string;

    date: Date;

    constructor({provider, date}: Omit<Appontiment, 'id'>) {
        this.id = uuid();
        this.provider = provider;
        this.date = date;


    }

}

export default Appontiment;