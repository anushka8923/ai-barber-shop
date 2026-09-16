import './globals.css';
import NavTracker from '../components/NavTracker';

export const metadata = {
  title: 'Haircut - Your Barber Shop',
  description: 'Premium haircut and grooming services.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-white">
        <NavTracker />
        {children}
      </body>
    </html>
  )
}
