const baseURL = "http://localhost:3333"

let globalToken = "";

export const createUser = async data => {
  const user = await fetch(`${baseURL}/users/create`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseJson) => responseJson)
    .catch((error) => error);
  return user;
}


export const login = async data => {
  const tokenAPI = await fetch(`${baseURL}/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseJson) => responseJson)
    .catch((error) => error);

  globalToken = tokenAPI;
  return globalToken;
}

export const getProfile = async token => {
  const response = await fetch(`${baseURL}/users/profile`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  })
    .then((response) => response.json())
    .then((responseJson) => responseJson);
  return response;
}

export const getPosts = async token => {
  const posts = await fetch(`${baseURL}/posts`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  })
    .then((response) => response.json())
    .then((responseJson) => responseJson);
  return posts;
}

export const createPost = async (token, data) => {
  const post = await fetch(`${baseURL}/posts/create`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseJson) => responseJson)
    .catch((error) => error);

  return post;
}

export const patchPost = async (id, token, data) => {
  const post = await fetch(`${baseURL}/posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseJson) => responseJson)
    .catch((error) => error);

  return post;
}

export const deletePost = async (id, token) => {
  const post = await fetch(`${baseURL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then((response) => response.json())
    .then((responseJson) => responseJson)
    .catch((error) => error);
  return post
}
