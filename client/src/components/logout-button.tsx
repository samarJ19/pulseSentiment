import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { clearAuthStorage } from "@/util/auth"

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
