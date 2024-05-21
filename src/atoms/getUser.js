import { atom } from 'jotai';
import Cookies from 'js-cookie';

export const userAtom = atom(async () => {
  const token = Cookies.get("token");
  if (!token) return null;

  const response = await fetch('http://localhost:1337/api/users/me', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const userData = await response.json();
    return userData;
  } else {
    return null;
  }
});
