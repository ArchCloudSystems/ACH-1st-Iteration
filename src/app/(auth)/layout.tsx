import { ReactNode } from "react"
import { Navbar } from "@/components/navbar"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        {children}
      </div>
    </>
  )
}

export default Layout