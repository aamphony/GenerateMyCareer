export const register = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  console.log('Registering with', username, password);
  const res = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const res = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const logout = async () => {
  const res = await fetch('http://localhost:3000/api/auth/logout', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const getCurrentUser = async () => {
  const res = await fetch('http://localhost:3000/api/auth/me', {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    credentials: 'include',
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json.data;
};
