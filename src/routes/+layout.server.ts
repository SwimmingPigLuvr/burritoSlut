import type { LayoutServerLoad } from './$types'
import { getSession } from '$lib/session'

export const load: LayoutServerLoad = async ({ locals }) => {
    const { user } = locals
    const session = getSession(user)

    return { session }
}

