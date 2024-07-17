import { atom } from 'jotai';

export const authAtom = atom({
  userId: null,
  username: null,
  isLoading: true,
  isAuthenticated: false,
});
