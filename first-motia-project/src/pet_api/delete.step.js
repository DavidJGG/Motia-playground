import { remove } from './database'

export const config = {
  name: 'DeletePet',
  type: 'api',
  path: '/pets/:id',
  method: 'DELETE',
  flows: ['pet-api'],
  emits: []
}

export const handler = async (req) => {
  // In a real application, this would be a database call
  // e.g., const ok = await db.pets.delete(req.pathParams.id)
  const element = remove(req.pathParams.id)  
  return element
    ? { status: 200, body: element }
    : { status: 404, body: { message: 'Not found' } }
}