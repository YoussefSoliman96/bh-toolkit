import { Switch, useThemeContext } from "@radix-ui/themes";

const ThemeSwitch = () => {
  const { onAppearanceChange } = useThemeContext();

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");

    if (currentTheme === "light") {
      onAppearanceChange("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      onAppearanceChange("light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

  return (
    <>
      <Switch onClick={toggleTheme} size="3" />
    </>
  );
};

export default ThemeSwitch;
