import request from 'superagent'
import type { Group } from '../../models/groups'

const rootURL = new URL('/api/v1', document.baseURI).toString

export async function getGroupById(id:Number) {
    const response = await request.get(rootURL + '/groups/' + id)

    return response.body as Group
}