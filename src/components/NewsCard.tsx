import { Heart, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NewsCardProps {
  author: string;
  authorAvatar: string;
  title: string;
  content: string;
  likes: number;
  date: string;
}

const NewsCard = ({ author, authorAvatar, title, content, likes, date }: NewsCardProps) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={authorAvatar} />
          <AvatarFallback>{author.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-foreground">{author}</p>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
      </div>

      <div className="bg-secondary rounded-xl p-4 text-sm text-foreground leading-relaxed font-mono">
        {content}
      </div>

      <div>
        <h4 className="font-semibold text-foreground mb-2">{title}</h4>
        <p className="text-sm text-muted-foreground line-clamp-2">
          В наш день* мы ходили по большим коридам — но такие цели!..
        </p>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <Heart className="w-5 h-5" />
          <span className="text-sm font-medium">{likes}</span>
        </button>
        <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <Share2 className="w-5 h-5" />
          <span className="text-sm">Поделиться</span>
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
