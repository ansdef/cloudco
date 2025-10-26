import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, ExternalLink, ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { institutionsApi, coursesApi } from "@/lib/api";
import type { Institution, Course } from "@/types/api";

const InstitutionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      
      setLoading(true);
      const instResponse = await institutionsApi.getById(id);
      const coursesResponse = await coursesApi.getAll(undefined, id);
      
      if (instResponse.data) {
        setInstitution(instResponse.data as Institution);
      }
      if (coursesResponse.data) {
        setCourses(coursesResponse.data as Course[]);
      }
      setLoading(false);
    };

    loadData();
  }, [id]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[430px] mx-auto min-h-screen bg-background pb-8">
        <Header />
        
        <main className="px-4 space-y-5">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Загрузка...</p>
            </div>
          ) : institution ? (
            <>
              <div className="relative h-[280px] rounded-3xl overflow-hidden">
                <img 
                  src={institution.images?.[0] || "/placeholder.svg"} 
                  alt={institution.name} 
                  className="w-full h-full object-cover"
                />
                {institution.images && institution.images.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center">
                    <div className="flex gap-2">
                      {institution.images.map((_, idx) => (
                        <div key={idx} className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-white' : 'bg-white/50'}`}></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {institution.name}
                </h1>
                <p className="text-muted-foreground mb-1">{institution.address}</p>
                <p className={institution.isOpen ? "text-status-open" : "text-status-closed"}>
                  {institution.isOpen ? "Открыто" : "Закрыто"}
                </p>
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
                <span className="text-foreground text-sm">{institution.phone}</span>
                <Button variant="ghost" size="sm" className="text-muted-foreground h-auto py-1 px-2 text-sm">
                  Позвонить
                </Button>
              </div>
              
              {institution.website && (
                <div className="bg-card/50 rounded-xl px-4 py-3 flex items-center justify-between">
                  <span className="text-foreground text-sm">{institution.website}</span>
                  <Button variant="ghost" size="sm" className="text-muted-foreground h-auto py-1 px-2 text-sm">
                    Перейти
                  </Button>
                </div>
              )}
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
              {courses.map((course) => (
                <Link key={course.id} to={`/course/${course.id}`}>
                  <div className="bg-card/30 rounded-2xl p-4 space-y-3">
                    <h3 className="font-medium text-foreground text-sm leading-snug">{course.title}</h3>
                    <Button className="w-full bg-gradient-primary hover:opacity-90 text-foreground font-medium rounded-xl h-11 text-sm">
                      Записаться
                      <span className="ml-2 text-xs opacity-80">Осталось {course.availableSpots} места</span>
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </section>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-destructive">Учреждение не найдено</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default InstitutionDetail;
