import { prismaClient } from "../app/database.js";
import { ResponseError } from "../lib/error.response.js";
import { ReposisiValidation } from "../validation/reposisi.validation.js";
import { Validation } from "../validation/validation.js";

export class ReposisiService {
    static async createReposisi(request) {
        const reposisiRequest = Validation.validate(ReposisiValidation.CREATE, request);

        const existing = await prismaClient.reposisi.findUnique({
            where: { id: reposisiRequest.id },
        });

        if (existing) {
            throw new ResponseError(400, "Reposisi dengan ID ini sudah ada");
        }

        const newReposisi = await prismaClient.reposisi.create({
            data: reposisiRequest,
        });
        return newReposisi;
    }

    static async getAllReposisis() {
        return prismaClient.reposisi.findMany();
    }
}