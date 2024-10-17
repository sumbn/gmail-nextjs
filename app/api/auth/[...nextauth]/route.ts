import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ErrorResponse, LoginResponse } from '../../../../types';
import { apiCall } from '../../../../utils';

async function login(
  email: string,
  password: string
): Promise<LoginResponse | ErrorResponse> {
  const response = await apiCall<LoginResponse>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
    {
      method: 'POST',
      body: { email, password },
    }
  );

  return response;
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
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email hoặc mật khẩu bị thiếu');
        }

        const userData = await login(credentials.email, credentials.password);

        if ('error' in userData) {
          console.error('Đăng nhập thất bại:', userData.error);
          return null;
        }

        if (userData && userData.user) {
          return {
            name: userData.user.name,
            email: userData.user.email,
            accessToken: userData.accessToken,
          } as User;
        }

        return null;
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
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user = {
          email: token.email,
          name: token.name,
          accessToken: token.accessToken,
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
