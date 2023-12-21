import '../styles/globals.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/tailwind.css";
import type { Metadata } from 'next'

// Verificar procedimentos para internacionalização
//const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cerberus Platform',
  description: 'DEX Bot trading platform',
}

export const viewport = {
  width: 1,
  themeColor: '#000000'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/img/brand/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/img/brand/apple-icon.png"
        />
      </head>
      <body className="text-blueGray-700 antialiased">
        {children}
        <script type="text/javascript" src="https://s3.tradingview.com/tv.js" ></script>
      </body>
    </html>
  )
}
