import { useFlash } from "@/hooks/useAuth";
import { Head } from "@inertiajs/react";
import { ReactNode} from "react";
import { toast, Toaster } from "sonner";

interface BaseLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}


export function BaseLayout({children}: BaseLayoutProps) {
    const flash = useFlash(); 


    if (flash.error) {
        toast.error(flash.error, { 
            duration: 3000,
        });
    }
    return (
        <>
        <Head>
            <title>Your page title</title>
        </Head>
        <Toaster />
        {children}
        </>
    );
}