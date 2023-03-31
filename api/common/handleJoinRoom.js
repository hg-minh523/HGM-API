import { verifyUser } from "./authentication"

export const handleUserJoin = {
    getUser: (socket,token) => {
        const user = verifyUser(token);
        socket.join(user.id)
    },
    
}
