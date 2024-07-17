import NextAuth from 'next-auth'

declare module NextAuth {
  interface User {
    id: string
    name: string
    email: string
    username: string
    avata_url: string
  }
}
