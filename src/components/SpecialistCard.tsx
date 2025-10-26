import { MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SpecialistCardProps {
  name: string;
  avatar: string;
}

const SpecialistCard = ({ name, avatar }: SpecialistCardProps) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex items-center justify-between hover:border-primary transition-colors">
      <div className="flex items-center gap-4">
        <Avatar className="w-14 h-14">
          <AvatarImage src={avatar} />
          <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <p className="font-medium text-foreground text-lg">{name}</p>
      </div>
      
      <button className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center hover:bg-muted transition-colors">
        <MessageSquare className="w-6 h-6 text-foreground" />
      </button>
    </div>
  );
};

export default SpecialistCard;
