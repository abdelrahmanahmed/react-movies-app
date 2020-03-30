import React from 'react';
import { Typography,Box } from '@material-ui/core';

type TabPanelProps = {
    children?: React.ReactNode;
    index: any;
    value: any;
}

const TabPanel = ({ children, value, index, ...other }: TabPanelProps)=> {

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

export default TabPanel;
