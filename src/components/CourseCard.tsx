import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CourseCardProps {
  id: string;
  title: string;
  direction: string;
  spotsLeft: number;
}

const CourseCard = ({ id, title, direction, spotsLeft }: CourseCardProps) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
      <div>
        <h4 className="font-medium text-foreground text-lg mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{direction}</p>
      </div>
      
      <Link to={`/course/${id}`}>
        <Button 
          className="w-full bg-gradient-primary hover:opacity-90 text-foreground font-medium rounded-xl h-12"
        >
          Записаться
          <span className="ml-2 text-sm opacity-80">Осталось {spotsLeft} места</span>
        </Button>
      </Link>
    </div>
  );
};

export default CourseCard;
