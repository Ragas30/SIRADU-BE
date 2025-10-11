import { PatientHandleService } from "../services/patientHandle.service.js";

export class patientHandleController {
    static async createPatientHandle(req, res, next) {
        try {
            const request = req.body;
            const result = await PatientHandleService.createPatientHandle(request);
            res.status(201).json({
                success: true,
                message: "Patient Handle created successfully",
                result: result,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAllPatientHandles(req, res, next) {
        try {
            const result = await PatientHandleService.getAllPatientHandles();
            res.status(200).json({
                success: true,
                message: "Patient Handles fetched successfully",
                result: result,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getPatientHandleById(req, res, next) {
        try {
            const id = req.params.id;
            const result = await PatientHandleService.getPatientHandleById(id);
            res.status(200).json({
                success: true,
                message: "Patient Handle fetched successfully",
                result: result,
            });
        } catch (error) {
            next(error);
        }
    }
}