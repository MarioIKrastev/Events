import * as dateFns from 'date-fns'
import { Box, Button, List, ListItem } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Icon } from '@mui/material';
import { useState } from 'react';

export default function Calendar() {
    const [state, setState] = useState({
        currentMonth: new Date(),
        selectedDate: new Date()
    })

    function prevMonth() {
        setState({ ...state, currentMonth: dateFns.subMonths(state.currentMonth, 1) })
    }
    function nextMonth() {
        setState({ ...state, currentMonth: dateFns.addMonths(state.currentMonth, 1) })
    }
    const onDateClick = day => {
        state.selectedDate = day;
    }
    const monthDays = () => {
        const dayFormat = 'EEEE';
        const days = [];

        const startDay = dateFns.startOfWeek(state.currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <List key={i} sx={{
                    flexGrow: 1,
                    flexBasis: 0,
                    maxWidth: '100%',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}>
                    {dateFns.format(dateFns.addDays(startDay, i), dayFormat)}
                </List>
            )
        }
        return <ListItem sx={{
            mb: 3,
            p: 0,
            display: "flex",
            flexDirection: "row",
            flexWrap: 'wrap',
            width: "100%",
            textTransform: 'uppercase',
            fontSize: '14px',
        }}>{days}</ListItem>
    }

    function cells() {
        const { currentMonth, selectedDate } = state;
        const startMonth = dateFns.startOfMonth(currentMonth);
        const endMonth = dateFns.endOfMonth(startMonth);
        const startDay = dateFns.startOfWeek(startMonth);
        const endDay = dateFns.endOfWeek(endMonth);

        const format = 'd';
        const rows = [];
        let days = [];
        let day = startDay;
        let formattedDay = '';

        while (day <= endDay) {
            for (let i = 0; i < 7; i++) {
                formattedDay = dateFns.format(day, format);
                const cloneDay = day;

                days.push(
                    <ListItem>
                        <Button key={day} variant='outlined' color='secondary' sx={{
                            flexGrow: 1,
                            flexBasis: 0,
                            maxWidth: '100%',

                        }}>
                            <span>{formattedDay}</span>
                        </Button>
                    </ListItem>
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <List key={day} sx={{ display: 'flex', flexDirection: 'row' }}>
                    {days}
                </List>
            );
            days = [];
        }
        return <Box sx={{ zIndex: 4 }}>{rows}</Box>
    }


    function header() {
        const dateFormat = 'MMM Y';


        return (
            <Box sx={{ display: 'flex', flexDirection: 'row', mb: 3 }}>
                <Box sx={{
                    flexGrow: 1,
                    flexBasis: 0,
                    maxWidth: '100%',
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                }}>
                    <Box onClick={prevMonth} sx={{ cursor: 'pointer' }}>
                        <Icon>
                            <ArrowBackIosNewIcon />
                        </Icon>
                    </Box>
                </Box>
                <Box sx={{
                    flexGrow: 1,
                    flexBasis: 0,
                    maxWidth: '100%',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}>
                    <span>{dateFns.format(state.currentMonth, dateFormat)}</span>
                </Box>
                <Box sx={{
                    flexGrow: 1,
                    flexBasis: 0,
                    maxWidth: '100%',
                    justifyContent: 'flex-end',
                    textAlign: 'right'
                }}>
                    <Box onClick={nextMonth} sx={{ cursor: 'pointer' }}>
                        <Icon>
                            <ArrowForwardIosIcon />
                        </Icon>
                    </Box>
                </Box>
            </Box>

        )
    }


    return (
        <>
            {header()}
            {monthDays()}
            {cells()}
        </>
    )
}
