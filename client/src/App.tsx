import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // <-- Nuevo: Importamos Router de react-router-dom

// Los demás imports de componentes (asumiendo que los alias @/ funcionan)
import { Toaster } from "@/components/ui/toaster";
// Si tienes un Sonner, lo puedes agregar aquí (lo dejaremos simple por ahora)
import { TooltipProvider } from "@/components/ui/tooltip";

// Las páginas que ya tenías
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found"; // Cambié a NotFound mayúscula si así estaba en tu otro proyecto
import { queryClient } from "./lib/queryClient"; // Asumiendo que queryClient se importa de lib

// Nota: Tu componente App anterior usaba una estructura de función
// Aquí usaremos la estructura de componente funcional (flecha)

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* El componente Toaster de Shadcn/Radix */}
        <Toaster />
        
        {/* Usamos BrowserRouter, que sabemos que funciona con la configuración de Netlify + _redirects */}
        <BrowserRouter>
          <Routes>
            {/* Ruta principal */}
            <Route path="/" element={<Home />} />
            
            {/* Ruta de error 404. Usamos "*" para capturar todas las rutas no definidas */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;