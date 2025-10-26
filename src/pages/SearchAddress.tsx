import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import InstitutionCard from "@/components/InstitutionCard";
import EquipmentCard from "@/components/EquipmentCard";
import { useState } from "react";

const SearchAddress = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const institutions = [
    {
      id: "1",
      name: "ГОАУ Новгородский Кванторум",
      address: "Большая Московская ул., 39, корп. 1",
      workingHours: "9:00-19:00",
      isOpen: true,
      logo: "/placeholder.svg",
    },
    {
      id: "2",
      name: "ГОАУ Новгородский Кванторум",
      address: "Большая Московская ул., 39, корп. 1",
      workingHours: "9:00-19:00",
      isOpen: false,
      logo: "/placeholder.svg",
    },
  ];

  const equipment = [
    {
      id: "1",
      name: "Фрезерный станок",
      address: "Большая Московская ул., 126, корп. 3",
      workingHours: "10:00-17:00",
      distance: "1.26 км от вас",
      isOpen: true,
    },
    {
      id: "2",
      name: "Фрезерный станок",
      address: "Большая Московская ул., 126, корп. 3",
      workingHours: "10:00-17:00",
      distance: "1.26 км от вас",
      isOpen: false,
    },
  ];

  const filteredInstitutions = institutions.filter(item =>
    item.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEquipment = equipment.filter(item =>
    item.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        <div className="space-y-4">
          {filteredInstitutions.map((item) => (
            <InstitutionCard key={item.id} {...item} />
          ))}
          
          {filteredEquipment.map((item) => (
            <EquipmentCard key={item.id} {...item} />
          ))}
        </div>
      </main>
      </div>
    </div>
  );
};

export default SearchAddress;
