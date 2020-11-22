import Appointment from '../models/Appointment';
import { isEqual } from 'date-fns';

// Data Transfer Object

interface CreateAppointRepositoryDTO {
    provider: string;
    date: Date;
}

class AppointmentsRepository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public all(): Appointment[] {
        return this.appointments;
    }

    public findByDate(date: Date): Appointment | null {
        const findAppontment =
            this.appointments.find(appointment => isEqual(date, appointment.date));

        return findAppontment || null;
    }


    public create({provider, date}: CreateAppointRepositoryDTO): Appointment {
        const appointment = new Appointment({provider,date});

        this.appointments.push(appointment)
        return appointment;
    }

}

export default AppointmentsRepository
