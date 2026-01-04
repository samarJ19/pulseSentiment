import { Compass, Home, Undo2 } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function NotFound() {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <div className="bg-gradient-to-br from-primary/5 via-background to-background flex min-h-screen items-center justify-center px-6 py-16">
            <Card className="w-full max-w-2xl border-dashed">
                <CardHeader className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <span className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl ring-1 ring-primary/20">
                            <Compass className="size-6" aria-hidden="true" />
                        </span>
                        <div className="space-y-1">
                            <CardTitle className="text-2xl">Page not found</CardTitle>
                            <CardDescription className="text-balance text-base">
                                We couldn&apos;t find
                                <span className="text-foreground ml-1 font-medium">
                                    {location.pathname}
                                </span>
                                . The link may be broken or the page was moved.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-6">
                    <div className="text-muted-foreground border-border bg-muted/40 rounded-lg border border-dashed px-4 py-3 text-sm leading-relaxed">
                        Check the URL for typos, or jump back to a safe place below.
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Button size="lg" onClick={() => navigate("/")}>
                            <Home className="size-4" aria-hidden="true" />
                            Go home
                        </Button>
                        <Button size="lg" variant="outline" onClick={() => navigate(-1)}>
                            <Undo2 className="size-4" aria-hidden="true" />
                            Go back
                        </Button>
                        <Button size="lg" variant="ghost" onClick={() => navigate("/feedbackform")}>
                            Share feedback
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}