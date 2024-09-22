import { ReactElement } from "react";

import { useCurrentVisualization } from "./hooks/useCurrentVisualization";

import { Test } from "./visualizations/Test";
import { Test2 } from "./visualizations/Test2";

export const visualizations = [
  {
    id: "test",
    name: "Test",
    component: Test,
  },
  {
    id: "test2",
    name: "Test 2",
    component: Test2,
  },
];

export const App = (): ReactElement | null => {
  const [{ id }] = useCurrentVisualization();

  const viz = visualizations.find((visualization) => visualization.id === id);

  if (!viz) return null;

  const Component = viz.component;

  return <Component />;
};
