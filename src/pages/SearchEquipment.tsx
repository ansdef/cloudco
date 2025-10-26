import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import EquipmentCard from "@/components/EquipmentCard";
import { useState } from "react";
import { useEquipment } from "@/hooks/useEquipment";
import { useAuth } from "@/hooks/useAuth";
import { bookingsApi } from "@/lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SearchEquipment = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { equipment, loading, error } = useEquipment(searchQuery);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleRent = async (equipmentId: string) => {
    if (!isAuthenticated) {
      toast.error("Необходимо войти в систему");
      navigate("/login");
      return;
    }

    // Создаем бронирование оборудования
    try {
      const selectedDate = new Date();
      selectedDate.setDate(selectedDate.getDate() + 1); // Завтра

      const response = await bookingsApi.create({
        equipmentId: equipmentId,
        date: selectedDate.toISOString(),
        time: "10:00",
      });

      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success("Оборудование успешно забронировано!");
      }
    } catch (error) {
      toast.error("Ошибка при бронировании");
    }
  };

  const filteredEquipment = equipment.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[430px] mx-auto min-h-screen bg-background pb-8">
        <Header />
      
      <main className="px-6 space-y-6">
        <SearchBar 
          placeholder="Фрезерный станок" 
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery("")}
        />

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Загрузка...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">{error}</p>
          </div>
        ) : filteredEquipment.length > 0 ? (
          <div className="space-y-4">
            {filteredEquipment.map((item) => (
              <EquipmentCard 
                key={item.id}
                id={item.id}
                name={item.name}
                address={item.Institution?.address || ""}
                workingHours={item.workingHours}
                distance={item.distance || "N/A"}
                isOpen={item.isOpen}
                onRent={handleRent}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Ничего не найдено</p>
          </div>
        )}
      </main>
      </div>
    </div>
  );
};

export default SearchEquipment;
