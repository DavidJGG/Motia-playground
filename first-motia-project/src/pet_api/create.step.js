/**
 * Create a new pet
 *
 * POST /pets
 *
 * Body:
 * - name: string
 * - species: dog | cat | bird | other
 * - ageMonths: number
 *
 */

import { create } from './database'
import { z } from 'zod';

const responseSchema = {
  200: z.object({
    message: z.string(),
    status: z.string()
  })
}

export const config = {
  name: 'CreatePet',
  type: 'api',
  path: '/pets',
  method: 'POST',
  flows: ['pet-api'],
  emits: ['js.feeding.reminder.enqueued']
}

export const handler = async (req, {emit}) => {
  const b = req.body || {}
  const name = typeof b.name === 'string' && b.name.trim()
  const speciesOk = ['dog', 'cat', 'bird', 'other'].includes(b.species)
  const ageOk = Number.isFinite(b.ageMonths)

  if (!name || !speciesOk || !ageOk) {
    return { status: 400, body: { message: 'Invalid payload' } }
  }

  // In a real application, this would be a database call
  // e.g., const pet = await db.pets.create({ name, species: b.species, ageMonths: Number(b.ageMonths) })
  const petId = create({ name, species: b.species, ageMonths: Number(b.ageMonths) })

  if (emit) {
    await emit({
      topic: 'js.feeding.reminder.enqueued',
      data: {
        petId: petId,
        enqueuedAt: Date.now()
      }
    })
  }

  return { status: 201, body: { message: "success", id: petId } }
}