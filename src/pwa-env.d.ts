declare module 'virtual:pwa-register' {
  export function registerSW(options?: {
    immediate?: boolean
    onNeedRefresh?: () => void
    onOfflineReady?: () => void
    onRegistered?: (swScriptUrl: string) => void
    onRegisterError?: (error: any) => void
  }): void
}
