import { account, OAuthProvider } from "./appwrite";

export const loginWithGoogle = async () => {
  try {
    await account.createOAuth2Session(
      OAuthProvider.Google,
      "https://note-taking-app-frontend-pearl.vercel.app/auth/callback",
      "https://note-taking-app-frontend-pearl.vercel.app/login"
    );
  } catch (error) {
    console.error("GOOGLE LOGIN ERROR:", error);
  }
};

export const getUser = async () => {
  try {
    return await account.get();
  } catch (error) {
    console.error(error);
  }
};
