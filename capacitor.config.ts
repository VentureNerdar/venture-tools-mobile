import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "com.klonotech.venture",
  appName: "Venture",
  webDir: "dist",
  server: {
    cleartext: true, // ⬅️ Allow HTTP connections
    // hostname: 'localhost', // optional, default is 'localhost'
    androidScheme: "http", // optional, default is 'https' on Android
  },
}

export default config
