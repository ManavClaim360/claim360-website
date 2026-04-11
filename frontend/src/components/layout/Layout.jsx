import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ContactTab from './ContactTab'
import WhatsAppButton from './WhatsAppButton'
import AnnouncementBar from './AnnouncementBar'
import MobileBottomNav from './MobileBottomNav'
import CursorGlow from './CursorGlow'
import ParallaxBackdrop from './ParallaxBackdrop'
import ScrollToTop from './ScrollToTop'

export default function Layout() {
  return (
    <div className="relative isolate min-h-screen bg-white dark:bg-navy flex flex-col overflow-hidden">
      <ParallaxBackdrop />
      <CursorGlow />
      <div className="relative z-10 flex min-h-screen flex-col">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1" style={{ paddingTop: 'var(--header-stack-height)' }}>
          <Outlet />
        </main>
        <Footer />
      </div>
      <ScrollToTop />
      <ContactTab />
      <WhatsAppButton />
      <MobileBottomNav />
    </div>
  )
}
