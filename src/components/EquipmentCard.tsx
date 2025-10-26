import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface EquipmentCardProps {
  name: string;
  address: string;
  workingHours: string;
  distance: string;
  isOpen: boolean;
}

const EquipmentCard = ({ name, address, workingHours, distance, isOpen }: EquipmentCardProps) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{name}</h3>
        <div className="space-y-1 text-sm">
          <p className="text-muted-foreground">{address}</p>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">{workingHours}</span>
            <span className={isOpen ? "text-status-open" : "text-status-closed"}>
              {isOpen ? "Открыто" : "Закрыто"}
            </span>
          </div>
          <p className="text-muted-foreground flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {distance}
          </p>
        </div>
      </div>

      <Button className="w-full bg-gradient-primary hover:opacity-90 text-foreground font-medium rounded-xl h-12">
        Арендовать
      </Button>
    </div>
  );
};

export default EquipmentCard;
