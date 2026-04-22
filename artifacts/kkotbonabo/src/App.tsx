import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

// Pages
import Home from "@/pages/home";
import About from "@/pages/about";
import Magazine from "@/pages/magazine";
import MindProfile from "@/pages/mind-profile";
import Join from "@/pages/join";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* Admin — no navbar/footer */}
      <Route path="/admin" component={Admin} />

      {/* Main site */}
      <Route>
        <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
          <Navbar />
          <main className="flex-1">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/magazine" component={Magazine} />
              <Route path="/mind-profile" component={MindProfile} />
              <Route path="/join" component={Join} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
