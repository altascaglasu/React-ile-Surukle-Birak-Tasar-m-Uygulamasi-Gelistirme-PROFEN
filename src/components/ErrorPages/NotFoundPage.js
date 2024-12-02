import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Tooltip, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useSelector } from 'react-redux';

const NotFoundPage = () => {
    const loggedIn = useSelector((state) => state.user.loggedIn);
    const location = loggedIn ? 'Anasayfaya dön' : 'Giriş Sayfasına dön'
    return (
        <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>
                404 - Sayfa Bulunamadı
            </Typography>
            <Tooltip title={location}>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <HomeIcon sx={{ fontSize: 30, marginTop: 2, color: 'blue' }} />
                </Link>
            </Tooltip>
        </Box>
    );
};

export default NotFoundPage;
