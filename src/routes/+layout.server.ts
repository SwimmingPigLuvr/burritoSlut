import type { LayoutServerLoad } from './$types'
import { getSession } from './session/+server'

export const load: LayoutServerLoad = async ({ locals }) => {
    const { user } = locals
    const session = getSession(user)

    return { session }
}

