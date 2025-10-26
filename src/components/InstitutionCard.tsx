import { Link } from "react-router-dom";

interface InstitutionCardProps {
  id: string;
  name: string;
  address: string;
  workingHours: string;
  isOpen: boolean;
  logo?: string;
}

const InstitutionCard = ({ id, name, address, workingHours, isOpen, logo }: InstitutionCardProps) => {
  return (
    <Link to={`/institution/${id}`}>
      <div className="bg-card border border-border rounded-2xl p-5 hover:border-primary transition-colors">
        <div className="flex items-start gap-4">
          {logo && (
            <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0">
              <img src={logo} alt={name} className="w-12 h-12 object-contain" />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground mb-1 truncate">{name}</h3>
            <p className="text-sm text-muted-foreground mb-1">{address}</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">{workingHours}</span>
              <span className={isOpen ? "text-status-open" : "text-status-closed"}>
                {isOpen ? "Открыто" : "Закрыто"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default InstitutionCard;
