import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold">
          <span className="text-foreground">Cloud</span>
          <span className="text-primary italic">.co–</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-secondary rounded-full transition-colors">
          <Bell className="w-6 h-6 text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        
        <Avatar className="w-12 h-12 border-2 border-primary">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>ЕП</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
