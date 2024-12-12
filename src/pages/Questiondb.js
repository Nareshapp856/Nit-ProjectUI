import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate, redirect } from "react-router";
import AuthCtx from "../context/auth.context";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
// import { useSelector, useDispatch } from "../redux/hooks.helper";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Section from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import TopicIcon from "@mui/icons-material/Topic";
import logo from "./QuestionDB/logo.png";
// import {
//   modulesListSlice,
//   createModuleSlice,
//   deleteModuleSlice,
//   editModuleSlice,
//   excelModuleSlice,
//   selectedtechnologySlice,
//   technologiesListSlice,
//   moduleTechIdSlice,
// } from "../redux/root.slice";
import { Key } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import CodeIcon from "@mui/icons-material/Code";
import HomeIcon from "@mui/icons-material/Home";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Questiondb() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthCtx);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, []);
  const clearStates = () => {
    // alert('clicked');
    // dispatch(selectedtechnologySlice.actions.request({ technologyid: '', moduleid: '', topicid: '', subtopicid: '' }))
    //dispatch(selectedtechnologySlice.actions.reset());
    // dispatch(excelModuleSlice.actions.reset());
    // dispatch(createModuleSlice.actions.reset());
    // dispatch(editModuleSlice.actions.reset());
    // dispatch(deleteModuleSlice.actions.reset());
    //  dispatch(modulesListSlice.actions.reset());
  };
  // var dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* <Box sx={{ display: "flex" }}>
          <CssBaseline /> */}
        {/* { 
      <AppBar position="fixed" open={open} style={{backgroundColor:'#d41919bd'}}>
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
         
        </Toolbar>
      </AppBar> } */}
        {/* <Drawer variant="permanent" open={open}>
            <DrawerHeader
              style={{
                fontWeight: "bold",
                paddingRight: "0px",
                fontSize: "20px",
              }}
            >
              <img
                src={logo}
                alt="logo"
                height={"80px"}
                style={{ paddingRight: "0px" }}
              />
            </DrawerHeader>
            <Divider /> */}
        {/* <List>
               {['Technologies', 'Modules', 'Topics', 'SubTopics'].map((text, index) => (
           
          ))} 
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => {
                  // dispatch(
                  //   selectedtechnologySlice.actions.request({
                  //     technologyid: "",
                  //     moduleid: "",
                  //     topicid: "",
                  //     subtopicid: "",
                  //   })
                  // );
                  //clearStates();
                  // dispatch(modulesListSlice.actions.request());
                  navigate("/");
                  // window.location.href = "http://admin.nareshit.net";
                  //window.location.reload();
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => {
                  navigate("technologies");
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <BrowserUpdatedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Technologies"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => {
                  // dispatch(
                  //   selectedtechnologySlice.actions.request({
                  //     technologyid: "",
                  //     moduleid: "",
                  //     topicid: "",
                  //     subtopicid: "",
                  //   })
                  // );
                  //clearStates();
                  // dispatch(modulesListSlice.actions.request());

                  navigate("modules/0");
                  //window.location.reload();
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Modules"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => {
                  // dispatch(
                  //   selectedtechnologySlice.actions.request({
                  //     technologyid: "",
                  //     moduleid: "",
                  //     topicid: "",
                  //     subtopicid: "",
                  //   })
                  // );
                  navigate("topics/0");
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <TopicIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Topics"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => {
                  // dispatch(
                  //   selectedtechnologySlice.actions.request({
                  //     technologyid: "",
                  //     moduleid: "",
                  //     topicid: "",
                  //     subtopicid: "",
                  //   })
                  // );
                  navigate("subtopics/0");
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <TopicIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Sub Topics"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem> */}

        {/* <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => {
                  // dispatch(
                  //   selectedtechnologySlice.actions.request({
                  //     technologyid: "",
                  //     moduleid: "",
                  //     topicid: "",
                  //     subtopicid: "",
                  //   })
                  // );
                  navigate("question-view/0");
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <TopicIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="MCQ Question View"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => {
                  navigate("program-view");
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <CodeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Program View"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => {
                  navigate("testcase-view");
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <CodeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Test Cases View"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </List> */}

        {/* <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
        {/* </Drawer>
        </Box> */}
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
          style={{ margin: "5px", paddingTop: "0px" }}
        >
          hello welcome to questiond b
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default Questiondb;
