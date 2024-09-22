import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { Box, Paper, styled } from "@mui/material";
import { Size } from "../types";
import { useElementSize } from "../hooks/useElementSize";

const Legend = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
  padding: theme.spacing(2),
}));

type ChartWrapperProps<D> = {
  chart: (svg: SVGSVGElement, size: Size, data: D) => void;
  data: D;
  children?: ReactNode;
  legend?: ReactNode;
};

export const ChartWrapper = <D,>({
  chart,
  data,
  children,
  legend,
}: ChartWrapperProps<D>): ReactElement => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const size = useElementSize(wrapperRef);

  useEffect(() => {
    if (svgRef.current) {
      chart(svgRef.current, size, data);
    }
  }, [chart, size, data]);

  return (
    <Box
      ref={wrapperRef}
      height={"calc(100vh - 64px)"}
      width={"100%"}
      maxWidth={"100%"}
      maxHeight={"calc(100vh - 64px)"}
      position={"relative"}
      overflow={"hidden"}
    >
      <Legend elevation={3}>{legend}</Legend>
      <svg ref={svgRef} height={size.height} width={size.width}>
        {children}
      </svg>
    </Box>
  );
};
