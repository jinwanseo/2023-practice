import { Typography } from "@mui/joy";

/**
 * @title Error Message (Hook Form 에서 사용)
 */
function ErrorText({ message }: any) {
  if (!message) return <></>;
  return (
    <Typography color="danger" fontSize={11} sx={{ ml: 0.5, mt: 0.3 }}>
      {message}
    </Typography>
  );
}

export default ErrorText;
