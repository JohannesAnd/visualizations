import { ReactElement, ReactNode, useState } from "react";
import {
  AppBar as MuiAppBar,
  Box,
  Drawer,
  IconButton,
  styled,
  Toolbar,
  Typography,
  type AppBarProps as MuiAppBarProps,
  Select,
  FormControl,
  MenuItem,
} from "@mui/material";
import { Menu, ChevronLeft } from "@mui/icons-material";
import { visualizations } from "../App/App";
import { useCurrentVisualization } from "../hooks/useCurrentVisualization";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  maxWidth: "100vw",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
        maxWidth: `calc(100vw - ${drawerWidth}px)`,
      },
    },
  ],
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

type LayoutProps = {
  children: ReactNode;
  menu: ReactNode;
};

export const Layout = ({ children, menu }: LayoutProps): ReactElement => {
  const [showMenu, setShowMenu] = useState(false);
  const [visualization, setVisualizationId] = useCurrentVisualization();

  return (
    <Box sx={{ display: "flex", maxHeight: "100vh", overflow: "hidden" }}>
      <AppBar position={"fixed"} open={showMenu}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setShowMenu((s) => !s)}
            sx={[
              {
                mr: 2,
              },
              showMenu && { display: "none" },
            ]}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {visualization.name}
          </Typography>
          <form>
            <FormControl>
              <Select
                size={"small"}
                value={visualization.id}
                onChange={(event) => setVisualizationId(event.target.value)}
                sx={{ backgroundColor: "background.default" }}
              >
                {visualizations.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={showMenu}
        onClose={() => setShowMenu(false)}
      >
        <DrawerHeader>
          <IconButton onClick={() => setShowMenu(false)}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        {menu}
      </Drawer>
      <Main open={showMenu} sx={{ marginTop: "64px" }}>
        {children}
      </Main>
    </Box>
  );
};
