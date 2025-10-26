import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, ExternalLink, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const InstitutionDetail = () => {
  const directions = [
    { id: "1", title: "Информационные технологии и проектная деятельность", spotsLeft: 2 },
    { id: "2", title: "Информационные технологии и проектная деятельность", spotsLeft: 3 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[430px] mx-auto min-h-screen bg-background pb-8">
        <Header />
        
        <main className="px-4 space-y-5">
          <div className="relative h-[280px] rounded-3xl overflow-hidden">
            <img 
              src="/placeholder.svg" 
              alt="Institution" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <div className="w-2 h-2 rounded-full bg-white/50"></div>
                <div className="w-2 h-2 rounded-full bg-white/50"></div>
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              ГОАУ Новгородский Кванториум
            </h1>
            <p className="text-muted-foreground mb-1">Большая Московская ул., 39, корп. 1</p>
            <p className="text-status-closed">Закрыто до 09:00</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button className="bg-gradient-primary hover:opacity-90 text-foreground font-medium rounded-xl h-12">
              Записаться
            </Button>
            <Button variant="secondary" className="rounded-xl h-12">
              <MapPin className="w-5 h-5" />
            </Button>
            <Button variant="secondary" className="rounded-xl h-12">
              <Phone className="w-5 h-5" />
            </Button>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground italic">Контакты</h2>
            
            <div className="space-y-2">
              <div className="bg-card/50 rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="text-foreground text-sm">+7 (8162) 63-79-55</span>
                <Button variant="ghost" size="sm" className="text-muted-foreground h-auto py-1 px-2 text-sm">
                  Позвонить
                </Button>
              </div>
              
              <div className="bg-card/50 rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="text-foreground text-sm">kvantorium53.ru</span>
                <Button variant="ghost" size="sm" className="text-muted-foreground h-auto py-1 px-2 text-sm">
                  Перейти
                </Button>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-foreground italic">Направления обучения</h2>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-3">
              {directions.map((direction) => (
                <Link key={direction.id} to={`/course/${direction.id}`}>
                  <div className="bg-card/30 rounded-2xl p-4 space-y-3">
                    <h3 className="font-medium text-foreground text-sm leading-snug">{direction.title}</h3>
                    <Button className="w-full bg-gradient-primary hover:opacity-90 text-foreground font-medium rounded-xl h-11 text-sm">
                      Записаться
                      <span className="ml-2 text-xs opacity-80">Осталось {direction.spotsLeft} места</span>
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default InstitutionDetail;
