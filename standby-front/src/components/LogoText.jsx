import { LogoTitle } from "./Heading";

export default function LogoText() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <img src="/images/logo_icon_.png" alt="logo" style={{ width: "30px" }} />
      <LogoTitle>standbytogether</LogoTitle>
    </div>
  );
}
