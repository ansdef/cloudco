import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import ServiceCard from "@/components/ServiceCard";
import CourseCard from "@/components/CourseCard";
import NewsCard from "@/components/NewsCard";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background pb-8">
      <Header />
      
      <main className="px-6 space-y-8">
        <SearchBar placeholder="Поиск" />
        
        <div className="grid grid-cols-2 gap-4">
          <ServiceCard 
            title="Арендовать компьютер" 
            image="/placeholder.svg"
            link="/search/computer"
          />
          <ServiceCard 
            title="Использовать оборудование" 
            image="/placeholder.svg"
            link="/search/equipment"
          />
        </div>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Свободные места на курсы</h2>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
          
          <div className="space-y-3">
            <CourseCard 
              id="1"
              title="Информационные технологии и проектная деятельность"
              direction="IT Квантум"
              spotsLeft={2}
            />
            <CourseCard 
              id="2"
              title="Информационные технологии и проектная деятельность"
              direction="VR/AR Квантум"
              spotsLeft={3}
            />
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Актуальное</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <SlidersHorizontal className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <NewsCard 
              author="Евгений Просвирнин"
              authorAvatar="/placeholder.svg"
              title="Apple выпустила научную работу The Illusion of Thinking"
              content="Компьютеры — суета сует, о нас и нас всё суета! Идеал совершенства — это 32-БИТНЫЕ КОДЫ"
              likes={224}
              date="5 дек"
            />
            <NewsCard 
              author="Евгений Просвирнин"
              authorAvatar="/placeholder.svg"
              title="Apple выпустила научную работу The Illusion of Thinking"
              content="Компьютеры — суета сует, о нас и нас всё суета! Идеал совершенства — это 32-БИТНЫЕ КОДЫ"
              likes={224}
              date="5 дек"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
