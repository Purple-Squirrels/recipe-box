import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ListIcon from '@material-ui/icons/List';
import CasinoIcon from '@material-ui/icons/Casino';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useAuth } from "../../Context/auth";

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        navLink: {
            color: 'rgba(0, 0, 0, 0.87)',
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
    }),
);

export default () => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const { setAuthTokens } = useAuth();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const logOut = () => {
        setAuthTokens();
        handleDrawerClose();
    };

    return (
        <div>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Purple Squirrels
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <Link className={classes.navLink} to="/dashboard"  onClick={handleDrawerClose}>
                        <ListItem button key="Dashboard">
                            <ListItemIcon><DashboardIcon /></ListItemIcon>
                            <ListItemText primary={'Dashboard'} />
                        </ListItem>
                    </Link>
                    <Divider />
                    <Link className={classes.navLink} to="/recipe" onClick={handleDrawerClose}>
                        <ListItem button key="All Recipes">
                            <ListItemIcon><ListIcon /></ListItemIcon>
                            <ListItemText primary={'All Recipes'} />
                        </ListItem>
                    </Link>
                    <Link className={classes.navLink} to="/recipe/create" onClick={handleDrawerClose}>
                        <ListItem button key="Create Recipe">
                            <ListItemIcon><AddBoxIcon /></ListItemIcon>
                            <ListItemText primary={'Create Recipe'} />
                        </ListItem>
                    </Link>
                    <Divider />
                    <Link className={classes.navLink} to="/mikey-tic-tac-toe" onClick={handleDrawerClose}>
                        <ListItem button key="Mikey's Tic-Tac-Toe">
                            <ListItemIcon><CasinoIcon /></ListItemIcon>
                            <ListItemText primary={'Mikey\'s Tic-Tac-Toe'} />
                        </ListItem>
                    </Link>
                    <Link className={classes.navLink} to="/emma-tic-tac-toe" onClick={handleDrawerClose}>
                        <ListItem button key="Emma's Tic-Tac-Toe">
                            <ListItemIcon><CasinoIcon /></ListItemIcon>
                            <ListItemText primary={'Emma\'s Tic-Tac-Toe'} />
                        </ListItem>
                    </Link>
                    <Divider />
                    <ListItem className={classes.navLink} onClick={logOut} button key="Log Out">
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText primary={'Log Out'} />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
}