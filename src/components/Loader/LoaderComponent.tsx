
import * as React from 'react';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
const LoaderComponent = () => {
    return (

        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
    );
};

export {LoaderComponent};
