import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import InstitutionCard from "@/components/InstitutionCard";
import EquipmentCard from "@/components/EquipmentCard";
import { useState } from "react";
import { useInstitutions } from "@/hooks/useInstitutions";
import { useEquipment } from "@/hooks/useEquipment";

const SearchAddress = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { institutions, loading: institutionsLoading } = useInstitutions();
  const { equipment, loading: equipmentLoading } = useEquipment();

  const filteredInstitutions = institutions.filter(item =>
    item.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEquipment = equipment.filter(item =>
    (item.Institution?.address || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isLoading = institutionsLoading || equipmentLoading;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[430px] mx-auto min-h-screen bg-background pb-8">
        <Header />
      
      <main className="px-6 space-y-6">
        <SearchBar 
          placeholder="Большая Московская" 
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery("")}
        />

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Загрузка...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInstitutions.map((item) => (
              <InstitutionCard 
                key={item.id} 
                id={item.id}
                name={item.name}
                address={item.address}
                workingHours={item.workingHours}
                isOpen={item.isOpen}
                logo={item.logo}
              />
            ))}
            
            {filteredEquipment.map((item: any) => (
              <EquipmentCard 
                key={item.id} 
                name={item.name}
                address={item.Institution?.address || ""}
                workingHours={item.workingHours}
                distance={item.distance || "N/A"}
                isOpen={item.isOpen}
              />
            ))}
          </div>
        )}
      </main>
      </div>
    </div>
  );
};

export default SearchAddress;
