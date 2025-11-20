import { useMemo } from "react";
import { useSelector } from "react-redux";

import en from "../locales/en.json";
import ar from "../locales/ar.json";

const translations = { en, ar };

export default function useTranslation() {
  const language = useSelector((state) => state.language.language);

  const t = useMemo(() => {
    const getNestedValue = (obj, path) => {
      return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    };

    return (key) => {
      return getNestedValue(translations[language], key) || key;
    };
  }, [language]);

  return { t, language };
}
