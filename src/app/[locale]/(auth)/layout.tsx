interface LoginPageProps {
  children: React.ReactNode
}

export default function LoingLayout({ children }: LoginPageProps) {
  return <div className="min-h-screen">{children}</div>
}
