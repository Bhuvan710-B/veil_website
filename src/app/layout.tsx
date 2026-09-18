import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "veil. — See less. Do more. | On-Device Privacy for Browser AI",
  description:
    "Veil is an on-device privacy layer for AI browser agents. It reads, redacts, and reasons about webpages locally so passwords, Aadhaar, PAN, and credentials never leave the browser.",
  keywords: [
    "Veil AI",
    "browser agent privacy",
    "on-device visual perception",
    "SIH26171",
    "local redaction",
    "privacy proxy",
    "Team Obscura",
    "PII redaction",
    "WebGPU browser automation",
  ],
  authors: [{ name: "Veil AI (Team Obscura)" }],
  creator: "Team Obscura",
  publisher: "Veil AI",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://veil.ai",
    title: "veil. — The Privacy Layer Between Your Browser and AI",
    description:
      "Your AI agent shouldn't have to see your passwords to click a button. 100% on-device perception.",
    siteName: "Veil AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "veil. — See less. Do more.",
    description:
      "Privacy by architecture, not just policy. Local perception for browser agents.",
    creator: "@veil_ai",
  },
}

export const viewport: Viewport = {
  themeColor: "#0B1220",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className="font-sans antialiased bg-veil-ink text-white selection:bg-signal-green selection:text-veil-ink">
        {children}
      </body>
    </html>
  )
}