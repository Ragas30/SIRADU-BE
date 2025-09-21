export class RoomService {
    async createRoom(request) {
        const room = await this.Room.create(request);
        return room;
    }
    async getRoomById(id) {
        const room = await this.Room.findById(id);
        return room;
    }
    async getAllRooms() {
        const rooms = await this.Room.find();
        return rooms;
    }
    async updateRoom(id, request) {
        const room = await this.Room.findByIdAndUpdate(id, request, { new: true });
        return room;
    }
    async deleteRoom(id) {
        await this.Room.findByIdAndDelete(id);
        return;
    }
}