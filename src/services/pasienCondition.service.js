export class PasienConditionService {
    async createPasienCondition(request) {
        const pasienConditionRequest = Validation.validate(PasienConditionValidation.CREATE, request);

        const pasienCondition = await prismaClient.pasienCondition.create({
            data: pasienConditionRequest,
        });
        return pasienCondition; 

        const pasienConition = await prismaClient
    }
    
}