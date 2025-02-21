import { Client, Databases, Account, Teams } from 'appwrite'

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APP_ENDPOINT)
  .setProject(import.meta.env.VITE_APP_PROJECT)

export const databases = new Databases(client)
export const account = new Account(client)
export const teams = new Teams(client)
export const realtime = client

// Collection IDs
export const GAMES_COLLECTION = import.meta.env.VITE_APP_COLLECTION_ID
export const DATABASE_ID = import.meta.env.VITE_APP_DATABASE_ID

export { client } 