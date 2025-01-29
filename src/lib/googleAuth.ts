import { account, OAuthProvider } from './appwrite'

export const loginWithGoogle = async () => {
  try {
    const user = await account.createOAuth2Session(OAuthProvider.Google)
    console.log(user)
  } catch (error) {
    console.error(error)
  }
}

export const getUser = async () => {
  try {
    return await account.get()
  } catch (error) {
    console.error(error)
  }
}

