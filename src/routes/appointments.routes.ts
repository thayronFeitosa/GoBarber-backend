import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService'

const appointmentsRouter = Router();
const appontReporisory = new AppointmentRepository();

appointmentsRouter.get('/',(request, response)=>{
    const appointments = appontReporisory.all();
    return response.json(appointments)


})


appointmentsRouter.post('/', (request, response) => {
    try{
        const { provider, date } = request.body;

        const parserDate = parseISO(date);
        const createAppointment = new CreateAppointmentService(appontReporisory);
        const appointment = createAppointment.execute({provider,date: parserDate })
    
        return response.json(appointment)
    }catch(err){
        return response.status(400).json({erro: err.message})

    }
})

export default appointmentsRouter;