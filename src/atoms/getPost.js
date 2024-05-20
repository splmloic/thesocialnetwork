import{atom} from 'jotai';
import Cookies from 'js-cookie';

const token = Cookies.get("token");

export const refreshAtom = atom(0);

export const postsAtom = atom(async (get) => {
    get(refreshAtom); 
    const response = await fetch('http://localhost:1337/api/posts?populate=*&sort=id:desc', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
});