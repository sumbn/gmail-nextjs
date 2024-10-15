import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { LoginResponse } from '../../../../types';

async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    if (!response.ok) {
      throw new Error('Login failed');
    }
    const data: LoginResponse = await response.json();
    console.log('response =======> ', data);
    return data;
  } catch (error) {
    throw error;
  }
}

const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log('credentials =======>', credentials);
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Username or password is missing');
          }

          console.log('credentials =======>', credentials);

          const userData = await login(
            credentials?.email,
            credentials?.password
          );
          if (userData) {
            return {
              name: userData.user.name,
              email: userData.user.email,
            } as User;
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user = {
          email: token.email,
          name: token.name,
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
