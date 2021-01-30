import Axios from "axios"

export default {
  login: async (email, password) => {
    return await Axios.post(`/api/users/login`, {
      email,
      password,
    }).then((response) => {
      localStorage.setItem("session", JSON.stringify(response.data))
      return response.data.token
    })
  },

  signup: async ({ firstName, lastName, email, phone, password, role }) => {
    return await Axios.post(`/api/users`, {
      firstName,
      lastName,
      email,
      phone,
      password,
      role,
    })
  },

  register: async ({ parentName, childName, parentEmail, phone, ageGroup, courseName, trialDate }) => {
    debugger;
    return await Axios.post(`/api/users/register`, {
      parentName,
      childName,
      parentEmail,
      phone,
      ageGroup,
      courseName,
      trialDate
    })
  },

  logout: async () => {
    window.localStorage.removeItem("session")
    return Promise.resolve()
  },

  googleLogin: async ({ tokenId }, role) => {
    return await Axios.post("/api/redirect", {
      token: tokenId,
      role: role,
    }).then((response) => {
      localStorage.setItem(
        "session",
        JSON.stringify({
          ...response.data,
          ...{ isGoogleLogin: true },
        })
      )
      return response.data.token
    })
  },
}
