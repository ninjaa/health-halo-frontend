import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const users = [
  {
    id: 1,
    name: 'swirl',
    password: 'password',
  }
]

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Swirl user" },
        password: {  label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const user = users.find(user => user.name === credentials.username)
        if (user) {
          if(user.password === credentials.password) {
            return Promise.resolve(user)
          }else{
            return Promise.resolve(null)
          }
        } else {
          return Promise.resolve(null)
        }
      }
    })
  ],
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    brandColor: "", // Hex color code
    logo: "http://172.18.206.163:3000/Boston_Children's_Hospital_logo.svg.png", // Absolute URL to image
    buttonText: "" // Hex color code
  },
  secret: "jghjh67yguujjgg",
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
        
      session.user.id = token.id
      return session
    }
  }
})