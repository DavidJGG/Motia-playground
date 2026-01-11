import { z } from 'zod'
 
export const config = {
  name: 'petCreation',
  
  schema: z.object({ 
    message: z.string()
  }),
 
  baseConfig: {
    storageType: 'default',
  },
}