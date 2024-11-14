import GithubProvider from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption
  secret: 'Q+Wn5xHF+tVxfcoA0fsWxrIQPnn7oB27fXIDjtqDdVw=' as string,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: '0fa9dbb73ec56ea8bfca',
      clientSecret: '4ae14ad89f6d11a99c0591befedf1988cf8031d5'
    })
  ]
})