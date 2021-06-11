const RAILS_API = "https://higher-lower-api.herokuapp.com"

export const fetchDeck = () => {
  return {
    type: "FETCH_DECK",
    payload: ""
  }
}

export const fetchHighScores = () => {
  return dispatch => {
    fetch(`${RAILS_API}/high-scores`).then(res => res.json())
    .then(data => {
      dispatch({
        type: "FETCH_HIGH_SCORES",
        payload: data
      })
    })
  }
}

export const fetchUser = (id) => {
  return dispatch => {
    fetch(`${RAILS_API}/users/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
      }
    }).then(res => res.json())
    .then(data => {
      dispatch({
        type: "FETCH_USER",
        payload: data
      })
    })
  }
}

export const addUser = (user, history) => {
  return dispatch => {
    fetch(`${RAILS_API}/users`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({user: {email: user.email.toLowerCase(), password: user.password}})
    }).then(res => res.json())
    .then(data => {
      if(data.user && !data.user.message) {
        sessionStorage.setItem("id", data.user.id)
        sessionStorage.setItem("jwt", data.jwt)
        dispatch({type: "ADD_USER", payload: data.user})
        dispatch({type: "LOGIN_USER", payload: data.user})
        history.push(`/wp-jinook/wp-content/themes/bootstrap2wordpress/assets/etc/higher-lower-game/users/${data.user.id}`)
      } else {
        dispatch({type: "LOGIN_FAILED", payload: data.user})
      }
    })
  }
}

export const loginUser = (user, history) => {
  return dispatch => {
    fetch(`${RAILS_API}/login`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({user: {email: user.email.toLowerCase(), password: user.password}})
    }).then(res => res.json())
    .then(data => {
      if(!data.user.message) {
        sessionStorage.setItem("id", data.user.id)
        sessionStorage.setItem("jwt", data.jwt)
        dispatch({type: "LOGIN_USER", payload: data.user})
        history.push(`/wp-jinook/wp-content/themes/bootstrap2wordpress/assets/etc/higher-lower-game/users/${data.user.id}`)
      } else {
        dispatch({type: "LOGIN_FAILED", payload: data.user})
      }
    })
  }
}

export const logoutUser = (id, history) => {
  return dispatch => {
    fetch(`${RAILS_API}/logout/${id}`, {method: "DELETE"})
    .then(res => res.json()).then(data => {
      sessionStorage.clear()
      dispatch({type: "LOGOUT_USER", payload: data})
      history.push("/wp-jinook/wp-content/themes/bootstrap2wordpress/assets/etc/higher-lower-game")
    })
  }
}

export const resetUser = () => {
  return {type: 'RESET_USER'}
}

export const setUser = (user) => {
  return {type: 'SET_USER', payload: user}
}