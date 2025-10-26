import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourse } from "@/hooks/useCourses";
import { bookingsApi } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { course, loading } = useCourse(id || "");
  const { user, isAuthenticated } = useAuth();
  const [selectedDate, setSelectedDate] = useState(10);
  const [selectedTime, setSelectedTime] = useState("14:00");
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [agreedToNotifications, setAgreedToNotifications] = useState(true);
  const [addToCalendar, setAddToCalendar] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const handleBook = async () => {
    if (!isAuthenticated) {
      toast.error("Необходимо войти в систему");
      return;
    }

    if (!course) {
      toast.error("Курс не найден");
      return;
    }

    if (!agreedToTerms) {
      toast.error("Необходимо согласиться на обработку персональных данных");
      return;
    }

    const selectedDateTime = new Date(`2025-07-${selectedDate}T${selectedTime}:00`);

    setIsBooking(true);
    try {
      const response = await bookingsApi.create({
        courseId: course.id,
        date: selectedDateTime.toISOString(),
        time: selectedTime,
        notes: addToCalendar ? "Добавить в календарь" : "",
      });

      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success("Бронирование успешно создано!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Ошибка при бронировании");
    } finally {
      setIsBooking(false);
    }
  };

  const currentMonth = "Июль 2025";
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekends = [5, 6, 12, 13, 19, 20, 26, 27];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[430px] mx-auto min-h-screen bg-background pb-8">
        <Header />
        
        <main className="px-4 space-y-5">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Загрузка...</p>
            </div>
          ) : course ? (
            <>
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">{course.direction}</h1>
                <p className="text-muted-foreground text-sm mb-1">{course.Institution?.address || ""}</p>
                <p className="text-status-open text-sm">Осталось {course.availableSpots} свободных места</p>
              </div>

              <div className="relative h-[240px] rounded-3xl overflow-hidden">
                <img 
                  src={course.images?.[0] || "/placeholder.svg"} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
                {course.images && course.images.length > 1 && (
                  <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center">
                    <div className="flex gap-1.5">
                      {course.images.map((_, idx) => (
                        <div key={idx} className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-white' : 'bg-white/50'}`}></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="text-foreground leading-relaxed text-sm">
                <p>{course.description || "Нет описания"}</p>
              </div>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground italic">Записаться на консультацию</h2>
            <p className="text-muted-foreground text-sm">Расскажем про направления и запишем на занятия</p>

            <div>
              <h3 className="text-center font-semibold mb-4 text-foreground">{currentMonth}</h3>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {days.map((day) => {
                  const isWeekend = weekends.includes(day);
                  const isSelected = day === selectedDate;
                  const isPast = day < 10;
                  
                  return (
                    <button
                      key={day}
                      onClick={() => !isPast && setSelectedDate(day)}
                      disabled={isPast}
                      className={`
                        aspect-square rounded-full flex items-center justify-center text-sm font-medium transition-all
                        ${isSelected ? 'bg-foreground text-background ring-2 ring-foreground ring-offset-2 ring-offset-background' : ''}
                        ${isWeekend && !isSelected ? 'text-status-closed' : ''}
                        ${!isWeekend && !isSelected && !isPast ? 'text-foreground hover:bg-card/50' : ''}
                        ${isPast ? 'text-muted-foreground/30 cursor-not-allowed' : ''}
                      `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-foreground mb-3 font-medium">Время:</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedTime("14:00")}
                  className={`
                    flex-1 py-3 rounded-full font-medium transition-all
                    ${selectedTime === "14:00" ? 'bg-white text-background' : 'bg-transparent text-foreground border border-border hover:bg-card/50'}
                  `}
                >
                  14:00
                </button>
                <button
                  onClick={() => setSelectedTime("16:00")}
                  className={`
                    flex-1 py-3 rounded-full font-medium transition-all
                    ${selectedTime === "16:00" ? 'bg-white text-background' : 'bg-transparent text-foreground border border-border hover:bg-card/50'}
                  `}
                >
                  16:00
                </button>
              </div>
            </div>

            <Button 
              className="w-full bg-gradient-primary hover:opacity-90 text-foreground font-medium rounded-xl h-12"
              onClick={handleBook}
              disabled={isBooking}
            >
              {isBooking ? "Обработка..." : "Забронировать"}
            </Button>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Checkbox 
                  id="terms" 
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  className="mt-0.5 rounded-md data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label htmlFor="terms" className="text-sm text-foreground leading-snug cursor-pointer flex-1">
                  Я согласен/согласна на{" "}
                  <span className="underline">обработку персональных данных</span>
                </label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox 
                  id="notifications" 
                  checked={agreedToNotifications}
                  onCheckedChange={(checked) => setAgreedToNotifications(checked as boolean)}
                  className="mt-0.5 rounded-md data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label htmlFor="notifications" className="text-sm text-foreground leading-snug cursor-pointer flex-1">
                  Я хочу получить напоминание о записи на почту
                </label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox 
                  id="calendar" 
                  checked={addToCalendar}
                  onCheckedChange={(checked) => setAddToCalendar(checked as boolean)}
                  className="mt-0.5 rounded-md data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label htmlFor="calendar" className="text-sm text-foreground leading-snug cursor-pointer flex-1">
                  Добавить событие в личный календарь
                </label>
              </div>
            </div>
          </section>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-destructive">Курс не найден</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CourseDetail;
