import { useEffect, useState, useContext } from 'react';
import { RoversContext } from "../contexts";
import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import api from '../api/index'
import dayjs from 'dayjs';


const CustomDatePicker = ({ dateValue, setDateValue }) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div>
                <DatePicker
                    label="Please pick a date"
                    value={dateValue}
                    onChange={(newValue) => setDateValue(newValue)}
                />
            </div>
        </LocalizationProvider>

    );
}

const RoverDetail = () => {
    const { rovers, selectedRover } = useContext(RoversContext);
    const { state } = useLocation();
    const [roverPhotos, setRoverPhotos] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));

    useEffect(() => {
        const getRoverPhotos = async () => {
            const roverMatch = rovers.filter(rover => rover.id === state.id);
            if (roverMatch?.length) {
                // const resp = await api.getPhotos(roverMatch[0].name.toLowerCase(), getDate());
                const resp = await api.getPhotos(roverMatch[0]?.name.toLowerCase(), dayjs(selectedDate).format('YYYY-MM-DD'));
                // const resp = await api.getPhotos('curiosity', '2021-12-3');
                setRoverPhotos(resp);
            }
        }
        getRoverPhotos();
    }, [selectedDate])



    return (
        <Container maxWidth="md" sx={{ mt: '2rem' }}>
            <CustomDatePicker dateValue={selectedDate} setDateValue={setSelectedDate} />
            <Box sx={{
                // width: 500,
                height: 500,
                overflowY: 'scroll',
                mt: '1rem'
                // backgroundColor: 'primary.dark',
            }}>

                {
                    roverPhotos?.length ? (
                        <ImageList variant="masonry" cols={3} gap={8}>
                            {
                                roverPhotos.map(photo => (
                                    <ImageListItem key={photo.id}>
                                        <img
                                            src={`${photo.img_src}?w=248&fit=crop&auto=format`}
                                            srcSet={`${photo.img_src}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                            alt={photo.id}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                ))
                            }
                        </ImageList>
                    ) : (

                        <Typography gutterBottom variant="h6">
                            No Pictures for rover {selectedRover?.name} for selected date.
                        </Typography>
                    )
                }

            </Box>

        </Container>
    );
};

export default RoverDetail;