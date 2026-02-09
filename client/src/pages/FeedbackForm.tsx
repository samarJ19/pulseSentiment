import { FeedbackForm } from "@/components/feedback-form";
import { LogoutButton } from "@/components/logout-button";
import { GalleryVerticalEnd } from "lucide-react";

export default function FeedbackFormPage() {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10" style={{ backgroundImage: "url('/genbackground.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
            <div className="relative z-10 flex w-full max-w-2xl flex-col gap-4">
                <div className="flex items-center justify-between">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        PulseSentiment Inc.
                    </a>
                    <LogoutButton />
                </div>
                <FeedbackForm />
            </div>
        </div>
    );
}