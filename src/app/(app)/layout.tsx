import { Nav } from "@/components/nav/nav"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayoutProps({ children }) {
  return (
    <div>
      <Nav />
      {children}
    </div>
  )
}
