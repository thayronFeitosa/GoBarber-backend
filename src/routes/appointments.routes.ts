import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentsRepository';


const appointmentsRouter = Router();
const appontReporisory = new AppointmentRepository();

appointmentsRouter.get('/',(request, response)=>{
    const appointments = appontReporisory.all();
    return response.json(appointments)


})


appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;
    const parserDate = startOfHour(parseISO(date));

    const findAppontmentInSameDate = appontReporisory.findByDate(parserDate)
    if (findAppontmentInSameDate) {
        return response.status(402).json({ message: "This appoiment is already boocked" })
    }

    const appointment = appontReporisory.create({
        provider,
        date: parserDate
    })

    return response.json(appointment)
})

export default appointmentsRouter;