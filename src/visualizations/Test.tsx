import { ReactElement, useState } from "react";

import { select } from "d3-selection";
import { scaleLinear, scaleTime } from "d3-scale";
import { line } from "d3-shape";
import { axisBottom, axisLeft } from "d3-axis";
import { extent, max } from "d3-array";

import { ChartWrapper } from "../components/ChartWrapper";
import { Size } from "../types";
import { data } from "../data/timeseries";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { ColorLegend } from "../components/ColorLegend";
import { Layout } from "../components/Layout";

const margins = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 50,
};

const translate = (x: number, y: number): string => {
  return `translate(${x}, ${y})`;
};

const getXDomain = (data: Data[], reverse: boolean): [Date, Date] => {
  const [minX = new Date(), maxX = new Date()] = extent(data, (d) => d.date);

  if (reverse) return [maxX, minX];

  return [minX, maxX];
};

const getYDomain = (data: Data[]): [number, number] => {
  return [0, max(data, (d) => d.value) ?? 0];
};

type Data = {
  value: number;
  date: Date;
};

const chart = (
  svgElement: SVGSVGElement,
  size: Size,
  data: { line: Data[]; reverse: boolean },
) => {
  const svg = select(svgElement);

  const xScale = scaleTime()
    .domain(getXDomain(data.line, data.reverse))
    .range([margins.left, size.width - margins.right]);
  const yScale = scaleLinear()
    .domain(getYDomain(data.line))
    .range([size.height - margins.bottom, margins.top]);

  const xAxis = axisBottom(xScale);
  const yAxis = axisLeft(yScale);

  svg
    .select<SVGGElement>("g#xAxis")
    .attr("transform", translate(0, size.height - margins.bottom))
    .call(xAxis);

  svg
    .select<SVGGElement>("g#yAxis")
    .attr("transform", translate(margins.left, 0))
    .call(yAxis);

  const lineGenerator = line<Data>()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value));

  svg.select("path#line").datum(data.line).attr("d", lineGenerator);
};

export const Test = (): ReactElement => {
  const [strokeWidth, setStrokeWidth] = useState(1.5);
  const [strokeColor, setStrokeColor] = useState("steelblue");
  const [reverse, setReverse] = useState(false);

  return (
    <Layout
      menu={
        <Box
          component={"form"}
          display={"flex"}
          flexDirection={"column"}
          gap={2}
          padding={1}
        >
          <Typography variant={"h6"} component={"h2"}>
            {"Settings"}
          </Typography>
          <FormControl fullWidth>
            <InputLabel>{"Stroke width"}</InputLabel>
            <OutlinedInput
              type={"number"}
              label={"Stroke width"}
              value={strokeWidth}
              onChange={(event) => setStrokeWidth(Number(event.target.value))}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>{"Stroke color"}</InputLabel>
            <Select
              label={"Stroke color"}
              value={strokeColor}
              onChange={(event) => setStrokeColor(event.target.value)}
            >
              <MenuItem value={"steelblue"}>{"Steelblue"}</MenuItem>
              <MenuItem value={"red"}>{"Red"}</MenuItem>
              <MenuItem value={"green"}>{"Green"}</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <FormControlLabel
              control={
                <Checkbox
                  value={reverse}
                  onChange={() => setReverse((r) => !r)}
                />
              }
              label={"Reverse"}
            />
          </FormControl>
        </Box>
      }
    >
      <ChartWrapper
        chart={chart}
        data={{
          line: data.map(({ date, value }) => ({
            value: Number(value),
            date: new Date(date),
          })),
          reverse,
        }}
        legend={
          <>
            <Typography variant={"h6"} component={"h2"} gutterBottom>
              {"Legend"}
            </Typography>
            <ColorLegend color={"steelblue"} name={"Line 1"} />
            <ColorLegend color={"purple"} name={"Line 2"} />
            <ColorLegend color={"red"} name={"Line 3"} />
            <ColorLegend color={"green"} name={"Line 4"} />
          </>
        }
      >
        <g id={"xAxis"} />
        <g id={"yAxis"} />
        <path
          id={"line"}
          fill={"none"}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </ChartWrapper>
    </Layout>
  );
};
