const BASE_URL = 'https://react-shop-backend-seven.vercel.app';

export async function fetchClient<T>(url: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`);

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}
