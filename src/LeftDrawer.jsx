import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    }
}));



export function LeftDrawer({ onItemClick }) {

    const classes = useStyles();

    const categories = ['Top News', 'Entertainment', 'Business', 'Sports']

    const [category, setCategory] = useState(categories[0])
    const [isDrawerOpen, toggleDrawer] = useState(false)


    const sideList = () => (
        <div
            className={classes.list}>
            <List>
                {categories.map((category, index) => (
                    <ListItem button key={category}
                        onClick={() => {
                            setCategory(category)
                            onItemClick(index !== 0 ? category : '')
                            toggleDrawer(false)
                        }}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={category} />
                    </ListItem>
                ))}
            </List>

        </div>
    );

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                        onClick={() => toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" className={classes.title}>
                        {category}
                    </Typography>

                    <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="notification"
                        onClick={() => { }}>
                        <NotificationsIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer open={isDrawerOpen} onClose={() => toggleDrawer(false)}>
                {sideList()}
            </Drawer>
        </>
    );
}


