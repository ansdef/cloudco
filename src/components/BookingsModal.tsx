import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Clock, MapPin, X } from "lucide-react";
import { bookingsApi } from "@/lib/api";
import { toast } from "sonner";
import { useState, useEffect } from "react";

interface Booking {
  id: string;
  date: string;
  time: string;
  status: string;
  Course?: {
    title: string;
    direction: string;
  };
  Equipment?: {
    name: string;
    Institution?: {
      name: string;
      address: string;
    };
  };
}

interface BookingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingsModal = ({ open, onOpenChange }: BookingsModalProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      loadBookings();
    }
  }, [open]);

  const loadBookings = async () => {
    setLoading(true);
    const response = await bookingsApi.getAll();
    if (response.data) {
      setBookings(response.data as Booking[]);
    }
    setLoading(false);
  };

  const handleCancelBooking = async (id: string) => {
    try {
      const response = await bookingsApi.delete(id);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success("Бронирование отменено");
        loadBookings();
      }
    } catch (error) {
      toast.error("Ошибка при отмене бронирования");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-status-open";
      case "pending":
        return "text-yellow-500";
      case "cancelled":
        return "text-status-closed";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Подтверждено";
      case "pending":
        return "Ожидает";
      case "cancelled":
        return "Отменено";
      default:
        return status;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Мои бронирования
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Все ваши запроненые мероприятия и рабочие станции
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Загрузка...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <Calendar className="w-16 h-16 mx-auto text-muted-foreground" />
              <div>
                <p className="text-lg font-semibold text-foreground mb-2">
                  Нет бронирований
                </p>
                <p className="text-sm text-muted-foreground">
                  У вас пока нет запроненых мероприятий
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-card/30 border border-border rounded-2xl p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      {booking.Course && (
                        <>
                          <h4 className="font-semibold text-foreground text-sm">
                            {booking.Course.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {booking.Course.direction}
                          </p>
                        </>
                      )}
                      {booking.Equipment && (
                        <>
                          <h4 className="font-semibold text-foreground text-sm">
                            {booking.Equipment.name}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {booking.Equipment.Institution?.name}
                          </p>
                        </>
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {getStatusText(booking.status)}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">
                        {new Date(booking.date).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{booking.time}</span>
                    </div>
                    {booking.Equipment && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground text-xs">
                          {booking.Equipment.Institution?.address}
                        </span>
                      </div>
                    )}
                  </div>

                  {booking.status !== "cancelled" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCancelBooking(booking.id)}
                      className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Отменить бронирование
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default BookingsModal;
