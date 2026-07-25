import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouterState } from "@tanstack/react-router";

export function AOSProvider() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    AOS.init({
      duration: 750,
      easing: "ease-out-cubic",
      once: true,
      mirror: false,
      offset: 48,
      anchorPlacement: "top-bottom",
      delay: 0,
    });
  }, []);

  useEffect(() => {
    // Refresh AOS after route change so newly mounted elements animate.
    const t = setTimeout(() => AOS.refreshHard(), 50);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}