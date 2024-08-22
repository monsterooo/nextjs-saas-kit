import { Layout } from "@/components/dashboard/layout"
import { LayoutBody } from "@/components/dashboard/layout-body"
import { LayoutHeader } from "@/components/dashboard/layout-header"
import { LayoutShell } from "@/components/dashboard/layout-shell"
import ThemeSwitch from "@/components/dashboard/theme-switch"
import { UserNav } from "@/components/dashboard/user-nav"
import { Providers } from "@/components/providers"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Providers>
      <LayoutShell>
        <Layout>
          <LayoutHeader>
            <div className="ml-auto flex items-center space-x-4">
              <ThemeSwitch />
              <UserNav />
            </div>
          </LayoutHeader>
          <LayoutBody>{children}</LayoutBody>
        </Layout>
      </LayoutShell>
    </Providers>
  )
}
