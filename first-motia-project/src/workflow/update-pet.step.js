import { update } from './js-store.js'
 
export const config = {
  name: 'UpdatePet',
  type: 'api',
  path: '/pets/:id',
  method: 'PUT',
  emits: [],
  flows: ['JsPetManagement2']
}
 
export const handler = async (req) => {
  const b = req.body || {}
  const patch = {}
 
  if (typeof b.name === 'string') patch.name = b.name
  if (['dog', 'cat', 'bird', 'other'].includes(b.species)) patch.species = b.species
  if (Number.isFinite(b.ageMonths)) patch.ageMonths = Number(b.ageMonths)
  if (['available', 'pending', 'adopted'].includes(b.status)) patch.status = b.status
 
  // In a real application, this would be a database call
  // e.g., const updated = await db.pets.update(req.pathParams.id, patch)
  const updated = update(req.pathParams.id, patch)
  return updated 
    ? { status: 200, body: updated } 
    : { status: 404, body: { message: 'Not found' } }
}