import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function AOSProvider() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      offset: 60,
      delay: 0,
    });
  }, []);
  return null;
}