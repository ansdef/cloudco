import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const CourseDetail = () => {
  const [selectedDate, setSelectedDate] = useState(10);
  const [selectedTime, setSelectedTime] = useState("14:00");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToNotifications, setAgreedToNotifications] = useState(false);
  const [addToCalendar, setAddToCalendar] = useState(false);

  const currentMonth = "Июль 2025";
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekends = [5, 6, 12, 13, 19, 20, 26, 27];

  return (
    <div className="min-h-screen bg-background pb-8">
      <Header />
      
      <main className="px-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">VR/AR Квантум</h1>
          <p className="text-muted-foreground mb-1">Большая Московская ул., 39, корп. 1</p>
          <p className="text-primary">Осталось 2 свободных места</p>
        </div>

        <div className="relative h-64 rounded-3xl overflow-hidden">
          <img 
            src="/placeholder.svg" 
            alt="Course" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <div className="w-2 h-2 rounded-full bg-white/50"></div>
              <div className="w-2 h-2 rounded-full bg-white/50"></div>
            </div>
          </div>
        </div>

        <div className="text-foreground leading-relaxed">
          <p>
            Интересуетесь наукой и техникой? Собираетесь стать великим создателем игр? Мечтаете освоить передовые информационные технологии, игровые движки, хотите собрать собственные VR очки, создать свою первую 3D-модель или научиться обрабатывать панорамные видеоролики? Всё это у нас!
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground italic">Записаться на консультацию</h2>
          <p className="text-muted-foreground">Расскажем про направления и запишем на занятия</p>

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
                      ${isSelected ? 'bg-foreground text-background' : ''}
                      ${isWeekend && !isSelected ? 'text-status-closed' : ''}
                      ${!isWeekend && !isSelected && !isPast ? 'text-foreground hover:bg-secondary' : ''}
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
                  flex-1 py-3 rounded-xl font-medium transition-all
                  ${selectedTime === "14:00" ? 'bg-foreground text-background' : 'bg-secondary text-foreground border border-border'}
                `}
              >
                14:00
              </button>
              <button
                onClick={() => setSelectedTime("16:00")}
                className={`
                  flex-1 py-3 rounded-xl font-medium transition-all
                  ${selectedTime === "16:00" ? 'bg-foreground text-background' : 'bg-secondary text-foreground border border-border'}
                `}
              >
                16:00
              </button>
            </div>
          </div>

          <Button className="w-full bg-gradient-primary hover:opacity-90 text-foreground font-medium rounded-xl h-14 text-lg">
            Забронировать
          </Button>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Checkbox 
                id="terms" 
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm text-foreground leading-tight cursor-pointer">
                Я согласен/согласна на{" "}
                <span className="underline">обработку персональных данных</span>
              </label>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox 
                id="notifications" 
                checked={agreedToNotifications}
                onCheckedChange={(checked) => setAgreedToNotifications(checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="notifications" className="text-sm text-foreground leading-tight cursor-pointer">
                Я хочу получить напоминание о записи на почту
              </label>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox 
                id="calendar" 
                checked={addToCalendar}
                onCheckedChange={(checked) => setAddToCalendar(checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="calendar" className="text-sm text-foreground leading-tight cursor-pointer">
                Добавить событие в личный календарь
              </label>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CourseDetail;
