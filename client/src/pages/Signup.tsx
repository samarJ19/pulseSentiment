import { SignupForm } from "@/components/signup-form";
import { GalleryVerticalEnd } from "lucide-react";


export default function Signup(){
    //save role from the response to signup request
      return (
    <div className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10" style={{ backgroundImage: "url('/genbackground.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="relative z-10 w-full max-w-sm">
        <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          PulseSentiment Inc.
        </a>
        <SignupForm/>
        </div>
      </div>
    </div>
  )
}