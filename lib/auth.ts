import { auth } from './firebase/firebase-client';

export const signUp = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
  } catch (error) {
    alert(error);
  }
};

export const login = async (email: string, password: string): Promise<void> => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    alert(error);
  }
};

export const logout = async (): Promise<void> => {
  try {
    await auth.signOut();
  } catch (error) {
    alert(error);
  }
};
