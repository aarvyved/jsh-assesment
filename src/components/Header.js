import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'


const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Mars Rover Photos
                </Typography>
                <Link to="/">
                    <Button
                        style={{
                            color: 'white',
                            // backgroundColor: 'white'
                        }}>
                        Select Rover
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    )
};

export default Header;