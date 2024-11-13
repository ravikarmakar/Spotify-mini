import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInAuthButton from "./SignInAuthButton.jsx";
import { useAuthStore } from "@/stores/useAuthStore.ts";
import { cn } from "@/lib/utils.js";
import { buttonVariants } from "./ui/button.js";

const TopBar = () => {
  const { isAdimn: isAdmin } = useAuthStore();

  return (
    <div className="flex justify-between items-center p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      <div className="flex gap-2 itesms-center">
        <img src="/spotify.png" alt="spotify-logo" className="size-8" />
        Spotify
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to={"/adimn"}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin Dashboard
          </Link>
        )}

        <SignedOut>
          <SignInAuthButton />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
