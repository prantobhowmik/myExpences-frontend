
import { BASE_URL } from './base';

export interface LoginPayload {
  identifier: string;
  password: string;
}

export async function login(payload: LoginPayload) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Login failed');
  }
  return res.json();
}

export interface SignupPayload {
  full_name: string;
  username: string;
  email: string;
  mobile: string;
  date_of_birth: string;
  password: string;
}

export async function signup(payload: SignupPayload) {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Signup failed');
  }
  return res.json();
}
