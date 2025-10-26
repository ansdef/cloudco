import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import EquipmentCard from "@/components/EquipmentCard";
import { useState } from "react";

const SearchEquipment = () => {
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredEquipment = equipment.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-8">
      <Header />
      
      <main className="px-6 space-y-6">
        <SearchBar 
          placeholder="Фрезерный станок" 
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery("")}
        />

        {filteredEquipment.length > 0 ? (
          <div className="space-y-4">
            {filteredEquipment.map((item) => (
              <EquipmentCard key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Ничего не найдено</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchEquipment;
