import { removeOlder } from './database'

export const config = {
    type: 'cron',
    name: 'JsDeletionReaper',
    description: 'Daily job that permanently removeOlders for deletion',
    cron: '*/2 2 * * *', // Daily at 2:00 AM
    emits: [],
    flows: ['pet-api'],
    flows: ['JsPetManagement']
}

export const handler = async ({ emit, logger }) => {
    if (logger) {
        logger.info('🔄 Deletion Reaper started - scanning for pets to purge')
    }

    try {
        const count = removeOlder()


        logger.info('✅ Deletion Reaper completed', {
            totalScanned: count
        })
        

        // No emit - no subscribers for js.reaper.completed

    } catch (error) {
        if (logger) {
            logger.error('❌ Deletion Reaper error', { error: error.message })
        }
    }
}