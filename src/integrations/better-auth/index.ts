// // serverUrl
// // webClientUrl

// import { betterAuth } from "better-auth";
// import { betterAuthSecret, serverUrl, webClientUrl } from "../../environment";
// import { prismaAdapter } from "better-auth/adapters/prisma";
// import { username } from "better-auth/plugins";
// import { prismaClient } from "../prisma";

// const betterAuthServerClient = betterAuth({
//   baseURL: serverUrl,
//   trustedOrigins: [webClientUrl],
//   secret: betterAuthSecret,
//   database: prismaAdapter(prismaClient, {
//     provider: "postgresql",
//   }),
//   user: {
//     modelName: "User",
//   },
//   session: {
//     modelName: "Session",
//   },
//   account: {
//     modelName: "Account",
//   },
//   verification: {
//     modelName: "Verification",
//   },
//   emailAndPassword: {
//     enabled: true,
//   },
//   plugins: [username()],
//   advanced: {
//     defaultCookieAttributes: {
//       sameSite: "none",
//       secure: true,
//       partitioned: true,
//     },
//   },
// });

// export default betterAuthServerClient;




import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prismaClient } from "../prisma";
import { serverUrl, webClientUrl } from "../../environment"

export const betterAuthClient = betterAuth({
  baseURL: serverUrl,
  basePath: "/authentications",
  database: prismaAdapter(prismaClient, {
    provider: "postgresql",
  }),
  trustedOrigins: [serverUrl, webClientUrl],
  emailAndPassword: {
    enabled: true,
  },
  user: {
    modelName: "User",
  },
  account: {
    modelName: "Account",
  },
  session: {
    modelName: "Session",
    cookieCache: {
      enabled: true,
      maxAge: 15 * 60,
    },
  },
  verification: {
    modelName: "Verification",
  },
});