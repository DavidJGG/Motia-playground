import { list } from './database'
 
export const config = {
  name: 'GetPets',
  type: 'api',
  path: '/pets',
  method: 'GET',
  flows: ['pet-api'],
  emits: []
}
 
export const handler = async () => {
  // In a real application, this would be a database call
  // e.g., const pets = await db.pets.findAll()
  return { status: 200, body: list() }
}