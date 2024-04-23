import { InfoOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/joy";

function ErrorTooltip({ message }: any) {
  // if (!message) return <Box sx={{ width: 20 }} />;
  return (
    <Tooltip title={message} size="sm" arrow open variant="outlined">
      <InfoOutlined fontSize="small" color="error" />
    </Tooltip>
  );
}

export default ErrorTooltip;
