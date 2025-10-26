import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SearchEquipment from "./pages/SearchEquipment";
import SearchAddress from "./pages/SearchAddress";
import SearchSpecialists from "./pages/SearchSpecialists";
import InstitutionDetail from "./pages/InstitutionDetail";
import CourseDetail from "./pages/CourseDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/search/equipment" element={<SearchEquipment />} />
          <Route path="/search/computer" element={<SearchEquipment />} />
          <Route path="/search/address" element={<SearchAddress />} />
          <Route path="/search/specialists" element={<SearchSpecialists />} />
          <Route path="/institution/:id" element={<InstitutionDetail />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
