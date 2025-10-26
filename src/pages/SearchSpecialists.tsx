import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import SpecialistCard from "@/components/SpecialistCard";
import { useState } from "react";

const SearchSpecialists = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const specialists = [
    { id: "1", name: "Евгений Просвирнин", avatar: "/placeholder.svg" },
    { id: "2", name: "Евгений Просвирнин", avatar: "/placeholder.svg" },
    { id: "3", name: "Евгений Просвирнин", avatar: "/placeholder.svg" },
  ];

  const filteredSpecialists = specialists.filter(specialist =>
    specialist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-8">
      <Header />
      
      <main className="px-6 space-y-6">
        <SearchBar 
          placeholder="Евгений" 
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery("")}
        />

        <div className="space-y-3">
          {filteredSpecialists.map((specialist) => (
            <SpecialistCard key={specialist.id} {...specialist} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default SearchSpecialists;
