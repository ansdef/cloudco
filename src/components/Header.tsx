import { Bell, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import BookingsModal from "./BookingsModal";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [bookingsOpen, setBookingsOpen] = useState(false);
  const isHomePage = location.pathname === "/";

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        {!isHomePage && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/")}
            className="rounded-full hover:bg-secondary"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </Button>
        )}
        <div className="text-2xl font-bold">
          <span className="text-foreground">Cloud</span>
          <span className="text-primary italic">.co–</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <button 
              className="relative p-2 hover:bg-secondary rounded-full transition-colors"
              onClick={() => setBookingsOpen(true)}
            >
              <Bell className="w-6 h-6 text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            
            <Avatar className="w-12 h-12 border-2 border-primary">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>{user ? getInitials(user.name) : "U"}</AvatarFallback>
            </Avatar>
          </>
        ) : (
          <Button
            onClick={() => navigate("/login")}
            className="bg-gradient-primary hover:opacity-90 text-foreground font-medium rounded-xl px-6 h-10"
          >
            Войти
          </Button>
        )}
      </div>

      {isAuthenticated && (
        <BookingsModal 
          open={bookingsOpen} 
          onOpenChange={setBookingsOpen} 
        />
      )}
    </header>
  );
};

export default Header;
