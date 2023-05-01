import { useContext } from "react";
import { RoversContext } from "../contexts";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const RoverCard = ({ rover }) => {
    return (
        <Card sx={{ maxWidth: 345, maxHeight: 400 }} key={rover.id}>
            <CardActionArea>
                {/* <CardMedia
                    component="img"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    alt="green iguana"
                /> */}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {rover.name}
                    </Typography>

                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography gutterBottom variant="subtitle2" component="p">
                                    Landing Date:
                                </Typography>

                                &nbsp;
                                <Typography gutterBottom variant="caption">
                                    {rover.landing_date}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom variant="subtitle2" component="p">
                                    Launch Date:
                                </Typography>
                                &nbsp;
                                <Typography gutterBottom variant="caption">
                                    {rover.launch_date}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom variant="subtitle2" component="p">
                                    Total Photos:
                                </Typography>
                                &nbsp;
                                <Typography gutterBottom variant="caption">{rover.total_photos}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle2" component="p">
                                    List of Cameras:
                                </Typography>
                                <List className="camera-list">
                                    {
                                        rover.cameras?.map(camera => (
                                            <ListItem key={camera.id} disablePadding>
                                                <ListItemText >
                                                    <Typography gutterBottom variant="caption">
                                                        {camera.name}
                                                    </Typography>
                                                </ListItemText>
                                            </ListItem>
                                        ))
                                    }


                                </List>




                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

const RoverList = () => {
    const { rovers, selectedRover, setSelectedRover } = useContext(RoversContext);
    const navigate = useNavigate();


    const handleClick = (event, roverID) => {
        event.preventDefault();
        setSelectedRover(rovers.filter((rover) => rover.id === roverID)[0]);
        // push to detail route
        navigate('/rover-detail', { state: { id: roverID } });
    }

    return (
        <Container maxWidth="md" sx={{ mt: '2rem' }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {
                        rovers.map(rover => (
                            <Grid item xs={12} md={6} key={rover.id} onClick={(event) => handleClick(event, rover.id)}>
                                <RoverCard rover={rover} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Container>
    );
};

export default RoverList;