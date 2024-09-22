import { Box, Typography } from "@mui/material";
import { ReactElement } from "react";

type ColorLegendProps = {
  color: string;
  name: string;
};

export const ColorLegend = ({
  color,
  name,
}: ColorLegendProps): ReactElement => {
  return (
    <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={2}>
      <Box bgcolor={color} height={4} width={20} flexShrink={0} />
      <Typography>{name}</Typography>
    </Box>
  );
};
