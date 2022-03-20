import './Navbar.css';
import PropTypes from 'prop-types';
import {
    AppBar,
    Toolbar,
    CssBaseline,
    useScrollTrigger,
    Slide,
    IconButton,
    
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};



const Navbar = (props) => {

  const [transparent, setTransparent] = useState(false);
  const [useDrawer, setDrawer] = useState(false);

  window.addEventListener('scroll', event => {
    window.scrollY > 200 ? setTransparent(false)  : setTransparent(true); 
  })
  const list = (anchor = "right") => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={() => setDrawer(!useDrawer)}
      onKeyDown={() => setDrawer(!useDrawer)}
    >
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
    return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar className={transparent ? "navbar-transparent box-none" : "navbar-white"}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems:'center', paddingLeft:'0px !important', paddingRight:'0px !important',}}>
            <img className='icon-nav' src={require('../../images/cupcake-icon-png.png')}/>
            <IconButton 
                onClick={() => setDrawer(!useDrawer)}
                edge="start" 
                color={!transparent ? "inherit" : "default"} 
                aria-label="open drawer" 
                sx={{ mr: 3 }}
                >
                <MenuIcon fontSize='large'/>
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Drawer
        anchor="right"
        open={useDrawer}
        onClose={() => setDrawer(!useDrawer)}
        transitionDuration={400}
      >
        {list('right')}
      </Drawer>
    </>
  );
}

export default Navbar;