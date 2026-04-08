import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ContactTab from './ContactTab'
import WhatsAppButton from './WhatsAppButton'
import AnnouncementBar from './AnnouncementBar'
import MobileBottomNav from './MobileBottomNav'
import CursorGlow from './CursorGlow'

export default function Layout() {
  return (
    <div className="min-h-screen bg-white dark:bg-navy flex flex-col">
      <CursorGlow />
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ContactTab />
      <WhatsAppButton />
      <MobileBottomNav />
    </div>
  )
}
