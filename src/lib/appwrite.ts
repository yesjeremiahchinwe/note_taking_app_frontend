import { Client, Account, OAuthProvider } from 'appwrite'

const client = new Client()
client
  .setEndpoint(import.meta.env.VITE_REACT_APP_APPWRITE_HOST_NAME)// The Appwrite API endpoint
  .setProject(import.meta.env.VITE_REACT_APP_APPWRITE_PROJECT_ID!)// Your Appwrite project IDexport 

const account = new Account(client)
export { OAuthProvider, account }