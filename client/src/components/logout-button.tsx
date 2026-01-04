import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function clearAuthStorage() {
  try {
    localStorage.removeItem("ROLE")
    localStorage.removeItem("TOKEN")
    localStorage.removeItem("USER")
  } catch (error) {
    // ignore storage errors
  }

  // expire all cookies (best-effort for auth cookies set by backend)
  if (typeof document !== "undefined" && document.cookie) {
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=")
      const name = eqPos > -1 ? cookie.slice(0, eqPos).trim() : cookie.trim()
      if (name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
      }
    })
  }
}

export function LogoutButton({ className }: { className?: string }) {
  const navigate = useNavigate()

  const handleLogout = useCallback(() => {
    clearAuthStorage()
    navigate("/login", { replace: true })
  }, [navigate])

  return (
    <Button variant="outline" size="sm" className={cn("gap-2", className)} onClick={handleLogout}>
      Logout
    </Button>
  )
}
