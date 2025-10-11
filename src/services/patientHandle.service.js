export class PatientHandleService {
    static async createPatientHandle(request) {
        const patientHandle = await this.PatientHandle.create(request);
        return patientHandle;
    }

    static async getAllPatientHandles() {
        const patientHandles = await this.PatientHandle.findAll();
        return patientHandles;
    }

    static async getPatientHandleById(id) {
        const patientHandle = await this.PatientHandle.findByPk(id);
        return patientHandle;
    }
}