import { apiUrl } from '../config'

export const SESSION_TOKEN = 'fork/SESSION_TOKEN'
export const SESSION_ID = 'fork/SESSION_ID'

export const signUp = (firstName, lastName, email, password) => async dispatch => {
    try {
        const res = await fetch(`${apiUrl}/users/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, password })
        })

        if (!res.ok) {
            throw res
        }

        const { user, token } = await res.json()
        localStorage.setItem(SESSION_TOKEN, token)
        localStorage.setItem(SESSION_ID, user.id)
        dispatch(setUser(token, user))
    } catch (e) {
        const errData = await e.json()
    }
}

export const logIn = (email, password) => async dispatch => {
    try {
        const res = await fetch(`${apiUrl}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        if (!res.ok) {
            throw res
        }

        const { user, token } = await res.json()
        localStorage.setItem(SESSION_TOKEN, token)
        localStorage.setItem(SESSION_ID, user.id)
        dispatch(setUser(token, user))
    } catch (e) {
        const errData = await e.json()
        console.log(errData)
    }
}


export const fetchUserDetails = (token, id) => async dispatch => {
    const res = await fetch(`${apiUrl}/users/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(token)}`,
        }
    })
    const { user } = await res.json()
    dispatch(setUser(token, user))
}

const SET_USER = 'fork/users/SET_USER'
const REMOVE_USER = 'fork/users/REMOVE_USER'

export const logOut = () => {
    localStorage.removeItem(SESSION_ID)
    localStorage.removeItem(SESSION_TOKEN)

    window.location = '/'

    return {
        action: REMOVE_USER,
    }
}


const setUser = (token, user) => ({
    type: SET_USER,
    token,
    user
})

export default function reducer(state = {  }, action) {
    switch (action.type) {
        case SET_USER:
            return { token: action.token, ...action.user, ...state }
        case REMOVE_USER:
            return { id: null }
        default:
            return { ...state }
    }
}
