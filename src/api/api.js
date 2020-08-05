const domain = "http://localhost:1337"

export const sendPost = async (data) => {
    const url = `${domain}/api/posts`;
    const token = localStorage.getItem('tokenjwt');
    const response = await fetch(url, {
        method: "POST",
        headers:{
            'Authorization': 'Bearer '+ token
        },
        body: data
    });
    return response.json()
}

export const listPosts = async (pagesize = 7, page = 1) => {
    const url = `${domain}/api/posts?pagesize=${pagesize}&page=${page}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return response.json();
}

export const signup = async (data) => {
    const url = `${domain}/api/users/signup`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

export const login = async (data) => {
    const url = `${domain}/api/users/login`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}