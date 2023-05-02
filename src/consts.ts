// import.meta.env is vite specific
// see https://vitejs.dev/guide/env-and-mode.html#env-variables
export const APP_ID = import.meta.env.VITE_APP_ID ?? ''
export const USER_ID = import.meta.env.VITE_USER_ID ?? ''
export const NICKNAME = import.meta.env.VITE_NICK_NAME ?? ''
export const SALESFORCE_API_URL = import.meta.env.VITE_SALESFORCE_API_URL ?? ''

export const SALESFORCE_SUPPORT_CHAT_CHANNEL = 'SALESFORCE_SUPPORT_CHAT_CHANNEL'
