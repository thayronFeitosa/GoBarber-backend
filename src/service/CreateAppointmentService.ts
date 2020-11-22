import Appointent from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import { startOfHour } from 'date-fns'
import { getCustomRepository, Repository } from 'typeorm';
interface Request {
  provider: string;
  date: Date
}

class CreateAppointService {

  public async execute({ date, provider }: Request): Promise<Appointent> {
    const appointmentRepository = getCustomRepository(AppointmentsRepository)

    const appoimentDate = startOfHour(date)

    const findAppontmentInSameDate = await appointmentRepository.findByDate(
      appoimentDate);

    if (findAppontmentInSameDate) {
      throw Error("This appoiment is already boocked")
    }

    const appointment = appointmentRepository.create({
      provider,
      date: appoimentDate
    })
    await appointmentRepository.save(appointment);

    return appointment
  }


}

export default CreateAppointService;
