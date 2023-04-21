import axios from "axios";
import { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export async function register(
  credentials: any,
  headers: any 
) {
  const user = await axios.post(
    "http://localhost:8080/register",
    credentials,
    headers
  );

  return user;
}

export async function login(
  credentials: any,
  headers: any 
) {
  const user = await axios.post(
    "http://localhost:8080/public/login",
    credentials,
    headers
  );

  return user;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await login(credentials, {
           accept: '*/*',
           'Content-Type': 'application/json' 
        });

        if(user) {
            return user.data
        }

        return null
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    // ...add more providers her
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      session.user.accessToken = token.accessToken;
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if(user) {
      token.accessToken = user.jwt;
      }
      return token
    }
},
  pages: {
    signIn: '/auth',
  },
  debug: process.env.NODE_ENV === 'development',
  secret: 'lalalalal',
  session: {
    strategy: "jwt"
  }
}
