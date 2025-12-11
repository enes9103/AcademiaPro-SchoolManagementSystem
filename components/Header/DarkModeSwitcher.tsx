import useColorMode from "@/hooks/useColorMode";
import { FaSun, FaMoon } from "react-icons/fa";

const DarkModeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <button
      type="button"
      onClick={() => {
        if (typeof setColorMode === "function") {
          setColorMode(colorMode === "light" ? "dark" : "light");
        }
      }}
      className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm font-semibold text-[var(--text-primary)] shadow-sm hover:border-[var(--border-strong)]"
    >
      {colorMode === "dark" ? (
        <>
          <FaMoon className="text-[var(--text-primary)]" />
          <span>Dark</span>
        </>
      ) : (
        <>
          <FaSun className="text-[var(--text-primary)]" />
          <span>Light</span>
        </>
      )}
    </button>
  );
};

export default DarkModeSwitcher;
