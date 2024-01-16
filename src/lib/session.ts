import type { User } from "firebase/auth"

function getSession(user: User | null) {
    if (user) {
        const { id, name, email, roles } = user
        return { user: { id, name, email, roles } }
    }
    return { user: null }
}