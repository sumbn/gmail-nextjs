import NextAuth, { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null

        const res = await fetch(process.env.API_URL + '/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        })

        // if (res.status == 401){
        //   return null
        // }

        const response = await res.json()

        // return user

        if (res.ok && response) {
          return {
            email: response?.user?.email,
            name: response?.user?.name,
            accessToken: response?.accessToken,
          } as User
        } else {
          return null
        }
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SCRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email
        token.name = user.name
        token.accessToken = user.accessToken
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user = {
          email: token.email,
          name: token.name,
          accessToken: token.accessToken,
        }
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
