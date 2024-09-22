import { useLocation, useSearch } from "wouter";
import { visualizations } from "../App/App";

export const useCurrentVisualization = (): [
  { id: string; name: string },
  (id: string) => void,
] => {
  const queryParams = useSearch();
  const [, setLocation] = useLocation();

  const search = new URLSearchParams(queryParams);

  const id = search.get("id");

  const viz =
    visualizations.find((visualization) => visualization.id === id) ??
    visualizations[0];

  const setId = (id: string) => {
    const url = new URL(window.location.origin);

    url.searchParams.set("id", id);

    setLocation(url);
  };

  return [viz, setId];
};
