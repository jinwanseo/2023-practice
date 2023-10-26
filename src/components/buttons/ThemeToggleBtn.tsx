import * as React from "react";
import Switch from "@mui/joy/Switch";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useColorScheme } from "@mui/joy";

export default function ThemeToggleBtn() {
  const { mode, setMode } = useColorScheme();
  return (
    <Switch
      size="md"
      slotProps={{
        thumb: {
          children: mode === "light" ? <LightMode /> : <DarkMode />,
        },
      }}
      onClick={() => {
        setMode(mode === "dark" ? "light" : "dark");
      }}
      sx={{
        "--Switch-thumbSize": "16px",
      }}
    />
  );
}
