import { Router } from 'express';
import { parseISO } from 'date-fns';
import {getCustomRepository} from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../service/CreateAppointmentService'

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response)=>{
    const appointmentRepository = getCustomRepository(AppointmentsRepository);
   const appointments = await appointmentRepository.find();
    return response.json(appointments)


})


 appointmentsRouter.post('/', async (request, response)  => {
    try{
        const { provider, date } = request.body;

        const parserDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();
        const appointment = await createAppointment.execute({provider,date: parserDate })

        return response.json(appointment)
    }catch(err){
        return response.status(400).json({erro: err.message})

    }
})

export default appointmentsRouter;
