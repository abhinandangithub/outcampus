import { useEffect, useState } from "react"
import Router from "next/router"
import { initGA, logPageView } from "utils/analytics"
import { ThemeProvider, theme } from "@chakra-ui/core"
import { AuthProvider } from "utils/useAuth"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"
import "react-datepicker/dist/react-datepicker.css"
import "components/style.css"

const client = new ApolloClient({
  uri: "https://outcampus.herokuapp.com/v1/graphql",
  headers: {
    "x-hasura-admin-secret": "Shibia@123",
  },
})

function App({ Component, pageProps }) {
  const defaultSession = {
    role: "guest",
  }

  const [session, setSession] = useState(defaultSession)

  useEffect(() => {
    initGA()
    logPageView()
    Router.events.on("routeChangeComplete", logPageView)
  }, [])

  useEffect(() => {
    let sessionFromStorage = JSON.parse(localStorage.getItem("session"))
    setSession(sessionFromStorage || defaultSession)
  }, [Component])

  return (
    <ThemeProvider>
      <AuthProvider value={session}>
        <ApolloProvider client={client}>
          <script
              dangerouslySetInnerHTML={{
                __html: `
                     <!-- Hotjar Tracking Code for outcampus.in -->
                      (function(h,o,t,j,a,r){
                          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                          h._hjSettings={hjid:1907723,hjsv:6};
                          a=o.getElementsByTagName('head')[0];
                          r=o.createElement('script');r.async=1;
                          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                          a.appendChild(r);
                      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv='); 
              `,
              }}
          />
          <Component {...pageProps} />
        </ApolloProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
