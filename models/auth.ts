export type LoginPayload = {
  email: string
  password: string
}

export type UserRes = {
  name: string
  email: string
}

export type LoginRes = {
  user: UserRes
  accessToken: string
  refreshToken: string
}
