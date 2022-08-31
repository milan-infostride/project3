import { AppBar, Button, Card, Collapse, createTheme, Divider, Drawer, FormControl, Grid, InputLabel, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, OutlinedInput, Select, Tab, Tabs, ThemeProvider, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from 'react'
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonIcon from '@mui/icons-material/Person';
import { Container } from "@mui/system";
import './navbar.css'
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import './mylist.css'
import { useRef } from "react";
import { currentUserActions } from "../../Stores/slices/current-user-slice";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";



const Navbar = () => {
  let myButton = useRef();
  
    let bgColor = grey[900];
    let listbg = grey[500];
    let iconsx = {color: '#fff', pr:1}
    let theme = useTheme();
    let isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const [topOpen,setTopOpen] = useState(false);
    const [loginOpen,setLoginOpen] = useState(false);
    const [mobLoginOpen,setMobLoginOpen] = useState(false);
    const [listWidth,setListWidth] = useState();
    const [listLeft,setListLeft] = useState();
    const [listTop,setListTop] = useState();

    const [TabValue,setTabValue] = useState();
    const toggleDrawer = ()=>{
        setTopOpen((prevState)=>{
          let newState = !prevState;
          return newState;
        })
    }
    const loginToggler = ()=>{
      setLoginOpen((prevState)=>{
        let newState = !prevState;
        return newState;
      })
    }
    const LoginButton =  styled(Button)(({ theme }) => ({
      '&:hover':{
        backgroundColor: listbg
      }
    }))
   
    const currentUser = useSelector(state=> state.currentUser.currentUser)
    console.log('cu = ',currentUser)
    const currentUserDispatch = useDispatch();
    const logoutHandler = ()=>{
      localStorage.removeItem('currentUser');
      currentUserDispatch(currentUserActions.logout());
      window.location.replace('/login');
    }
    
    return ( 
      <>
        <Grid container  sx={{
            backgroundColor: bgColor,
            color: '#fff',
            py: 2,
            alignItems: 'center',
            mb: !isDesktop?0:2
        }}>
          <Grid item sx={{display: 'flex-item',alignSelf: 'center',flexGrow:1, ml: 1}}>
            <HomeTwoToneIcon   sx={{
                fontSize: '1.7em'
            }}></HomeTwoToneIcon>
            <Typography 
              variant="h1"
              sx={{
                fontSize : '1.5em',
                ml: 0.7
              }}
              >
                Address Book  
            </Typography>
          </Grid>
          { isDesktop &&
          <Grid sx={{display:'flex',alignItems:'center',mx:2}}>
            <Link href='#' underline='none' sx={{display:'flex',alignItems:'center' ,color:'#fff'}}>
            <Grid item sx={{display: 'flex-item'}}>
                <AccountCircleIcon sx={{mt: 0.5}} />
            </Grid>
            <Grid Item sx={{display: 'flex-item',ml:0.3}}>Hello {currentUser.fullName.split(' ')[0]}</Grid>
            </Link>
            {currentUser.id==-1 &&
            <LoginButton ref={myButton} size='small' sx={{ml:1,backgroundColor:listbg,color:'#fff'}} variant="contained" endIcon={<ArrowDropDownIcon />} startIcon={<LockIcon />}
              onClick={(e)=>{
                let pos = myButton.current.getBoundingClientRect();
                console.log(pos.left,pos.right)
                setListLeft((pos.left)+'px');
                setListTop(parseInt(pos.top+myButton.current.clientHeight-3)+'px')
                setListWidth(myButton.current.clientWidth+0.5) ;
                setMobLoginOpen((prevState)=>{ console.log();return !prevState})
              }}
            >
              Login/Signup
              
            </LoginButton>
            }
            {currentUser.id!=-1 &&
              <LoginButton  variant='contained' sx={{ml:1,backgroundColor:listbg,color:'#fff'}} size='small' onClick={()=>{logoutHandler()}}>Logout</LoginButton>

            }
            
          </Grid>
            }
          
          {!isDesktop &&<Grid item sx={{ml:'auto',display:'flex-item',mr:1}}>
            <MenuIcon onClick={()=>{toggleDrawer()}} />
          </Grid>} 
          
        </Grid>
        <Collapse orientation="vertical" in={mobLoginOpen} sx={{ width:listWidth,zIndex:999999,position:'absolute',left:listLeft,top:listTop}}>
              {/* <List className="mylist" sx={{ backgroundColor:listbg}}>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon sx={{justifyContent: 'end'}}>
                        <VpnKeyIcon sx={iconsx} />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>
                <Divider variant='middle' sx={{color: bgColor,width:'60%'}}></Divider>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon sx={{justifyContent: 'end'}}>
                        <PersonIcon sx={iconsx} />
                    </ListItemIcon>
                    <ListItemText primary="Sigup" />
                  </ListItemButton>
                </ListItem>
              </List> */}
              <div style={{backgroundColor: listbg,color:'#fff',fontSize:'0.9em'}}>
                <div onClick={()=>{setMobLoginOpen(false)}} style={{padding: '0.5em',paddingLeft:'1em', display:'flex', alignItems:'center'}}><VpnKeyIcon/> <span style={{paddingLeft:'0.6em'}}><RouterLink style={{textDecoration:'none',color:'#fff'}} to='/login'>Login</RouterLink></span></div>
                <Divider/>
                <div onClick={()=>{setMobLoginOpen(false)}} style={{padding: '0.5em',paddingLeft:'1em', display:'flex', alignItems:'center'}}><PersonIcon/> <span style={{paddingLeft:'0.6em'}}><RouterLink style={{textDecoration:'none',color:'#fff'}} to='/signup'>Signup</RouterLink></span></div>
              </div>
        </Collapse>
        <Collapse in={topOpen} sx={{backgroundColor: listbg, color:'#fff'}}>
          <List sx={{color: '#fff'}}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{justifyContent: 'end'}}>
                  <AccountCircleIcon sx={iconsx} />
                </ListItemIcon>
                <ListItemText primary="Hello Guest" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              {currentUser.id==-1 &&
              <ListItemButton>
                <ListItemIcon sx={{justifyContent: 'end'}}>
                  <LockIcon sx={iconsx} />
                </ListItemIcon>
                <ListItemText onClick={()=>{loginToggler()}} primary={<Grid container sx={{alignItems: 'center'}}><Grid item sx={{display: 'flex-item'}}>Login/SignUp</Grid><Grid item sx={{display: 'flex-item', mt:0.5}}><ArrowDropDownIcon sx={{color: '#fff'}} /></Grid></Grid>} />
               
              </ListItemButton>
              }
               {currentUser.id !=-1 && 
                  <Button color='secondary' sx={{ml:'3.7em',mt:0.7,mb:1.3}} variant="contained" size='small' onClick={()=>{logoutHandler()}}>Logout</Button> 

               } 
            </ListItem>
            <Collapse in={loginOpen}>
              <List sx={{pl:1.5}}>
                <ListItem>
                  <RouterLink onClick={()=>{ setTopOpen(false) }} style={{textDecoration:'none',color:'#fff'}} to='/login'>
                  <ListItemButton>
                    <ListItemIcon sx={{justifyContent: 'end'}}>
                        <VpnKeyIcon sx={iconsx} />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                  </ListItemButton>
                  </RouterLink>
                </ListItem>
                <Divider variant='middle' sx={{color: bgColor,width:'60%'}}></Divider>
                <ListItem>
                <RouterLink onClick={()=>{ setTopOpen(false) }} style={{textDecoration:'none',color:'#fff'}} to='/signup'>
                  <ListItemButton>
                    <ListItemIcon sx={{justifyContent: 'end'}}>
                        <PersonIcon sx={iconsx} />
                    </ListItemIcon>
                    <ListItemText primary="Signup" />
                  </ListItemButton>
                </RouterLink>
                </ListItem>
              
              </List>
            </Collapse>
          </List>
        </Collapse>
       </>
      );
}
 
export default Navbar;