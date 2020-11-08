import Appointent from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import {startOfHour} from 'date-fns'

interface Request{
    provider: string;
    date : Date
}

class CreateAppointService{
    private appontimentRepository: AppointmentsRepository;
    constructor(appontimentRepository:AppointmentsRepository ){
        this.appontimentRepository = appontimentRepository;

    }

    public execute({date,provider}: Request): Appointent{
        const appoimentDate = startOfHour(date)

        const findAppontmentInSameDate = this.appontimentRepository.findByDate(
            appoimentDate);
        
        if (findAppontmentInSameDate) {
            throw Error("This appoiment is already boocked")
        }
    
        const appointment = this.appontimentRepository.create({
            provider,
            date: appoimentDate
        })

        return appointment
    }

    
}

export default CreateAppointService;