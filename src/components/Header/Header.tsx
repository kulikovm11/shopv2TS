import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Badge, Divider} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FitbitIcon from '@mui/icons-material/Fitbit';
import styles from './headerStyles.module.css'
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {ILoginUser} from "../../models";
import {useEffect, useState} from "react";
import {logoutUser} from "../../redux";




const Header = () => {

    const {currentUser} = useAppSelector(state => state.authReducer)
    const [sessionUser, setSessionUser] = useState<ILoginUser | null>(null);
    const dispatch = useAppDispatch()


    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const navigate = useNavigate();





    useEffect(() => {
        const sessionUserString = sessionStorage.getItem('currentUser');
        if (sessionUserString) {
            const sessionUserObj = JSON.parse(sessionUserString);
            setSessionUser(sessionUserObj);
        }


    }, [sessionUser])




    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogOut = () => {
        sessionStorage.removeItem("currentUser")
        dispatch(logoutUser())
        setSessionUser(null)
        navigate('')
    }



    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <FitbitIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Link to={''} style={{textDecoration:'none', color:'white'}}>SHOP</Link>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >

                                <MenuItem key={'blog'} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">Blog</Typography>
                                </MenuItem>

                        </Menu>
                    </Box>
                    <FitbitIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Link to={''} style={{textDecoration:'none', color:'white'}}>SHOP</Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                            <Button
                                key={'blog'}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Link to={'blog'} style={{textDecoration:'none', color:'white'}}>Blog</Link>
                            </Button>

                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {currentUser ? (
                                    <Avatar alt={currentUser.firstName} src={currentUser.image} style={{border:'1px solid white'}} />
                                ) : sessionUser ? (
                                    <Avatar alt={sessionUser.firstName} src={sessionUser.image} style={{border:'1px solid white'}} />
                                ) : (
                                    <Avatar alt="Guest" src="/static/images/avatar/2.jpg" />
                                )}

                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            {currentUser?(
                                <div className={styles.Username}>{currentUser.firstName} {currentUser.lastName}</div>
                            ):sessionUser?(
                                <div className={styles.Username}>{sessionUser.firstName} {sessionUser.lastName}</div>
                            ):null
                            }
                            <Divider/>

                            {!currentUser && !sessionUser ? (
                                <MenuItem  onClick={handleCloseUserMenu}>
                                    <Link to={'login'} style={{textDecoration:'none', color:'black'}}>Login</Link>
                                </MenuItem>
                            ) : null}


                            {!currentUser && !sessionUser?
                                <MenuItem  onClick={handleCloseUserMenu}>
                                <Link to={'register'} style={{textDecoration:'none', color:'black'}}>Register</Link>
                            </MenuItem>:
                                null}

                            {currentUser || sessionUser ? (<MenuItem  onClick={handleCloseUserMenu}>
                                    <Link to={'profile'} style={{textDecoration:'none', color:'black'}}>Profile</Link>
                                </MenuItem>): null}

                            {currentUser || sessionUser ? (
                                <MenuItem onClick={handleLogOut}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            ) : null}
                        </Menu>
                    </Box>

                    <div className={styles.Actions}>
                        <Button style={{color:'white'}}>
                            <Badge badgeContent={4} color="secondary">
                                <Link to={'wish'}><FavoriteIcon fontSize='large' style={{fontSize:'40px', color:'white'}}/></Link>
                            </Badge>
                        </Button>
                        <Button style={{color:'white'}}>
                            <Badge badgeContent={4} color="secondary">
                                <Link to={'cart'}><ShoppingCartIcon fontSize='large' style={{fontSize:'40px', color:'white'}}/></Link>
                            </Badge>
                        </Button>

                    </div>

                </Toolbar>
            </Container>
        </AppBar>
    );
};

export {Header};
