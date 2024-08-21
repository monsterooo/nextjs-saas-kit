import { Nav } from "@/components/nav/nav"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default function MarketingLayout({ children }) {
  return (
    <div>
      <Nav />
      {children}
    </div>
  )
}
