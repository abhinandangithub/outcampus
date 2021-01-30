import { createContext, useContext } from "react"

const AuthContext = createContext({
  role: "guest",
  token: null,
})

const AuthProvider = AuthContext.Provider

const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider }
