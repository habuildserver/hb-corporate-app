import './globals.css'
import { Inter } from 'next/font/google';
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Habuild Corporate',
  description: 'Corporate App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#19222f",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "#fff",
              secondary: "#19222f",
            },
          },
        }}
      />
        {children}
      
      </body>
    </html>
  )
}
