import { useState } from 'react';
import * as dateFns from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz';
import bg from 'date-fns/locale/bg'
import { Box, Button, List, ListItem, useTheme, Icon } from '@mui/material';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { styles } from './styles';

export default function Calendar() {
    const { cell, start, center, end, weekDays, weekDay } = styles;
    
    const theme = useTheme();
    const timeZone = 'Europe/Sofia';
    const [state, setState] = useState({
        currentMonth: utcToZonedTime(new Date(), timeZone, {weekStartsOn:5, locale: bg}),
        selectedDate: utcToZonedTime(new Date(), timeZone, {weekStartsOn:5, locale: bg})
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
    const week = () => {
        const dayFormat = 'EEEE';
        const days = [];

        const startDay = dateFns.startOfWeek(state.currentMonth);

        for (let i = 1; i <= 7; i++) {
            days.push(
                <ListItem disablePadding={true} key={i} sx={weekDay}>
                    {dateFns.format(dateFns.addDays(startDay, i), dayFormat)}
                </ListItem>
            )
        }
        return <List sx={weekDays}>{days}</List>
    }

    function cells() {
        const { currentMonth, selectedDate } = state;
        const startMonth = dateFns.startOfMonth(currentMonth);
        const endMonth = dateFns.endOfMonth(startMonth);
        const startDay = dateFns.startOfWeek(startMonth, {weekStartsOn: 1});
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
                    <ListItem disablePadding={true} sx={{ minHeight: '6em' }} key={i}>
                        <Button key={day} variant='outlined' sx={[cell,{
                            color: `${!dateFns.isSameMonth(day, startMonth) ? theme.palette.primary.dark : theme.palette.secondary.main}`,
                            background: `${!dateFns.isSameMonth(day, startMonth) ? 'linear-gradient(0deg, rgba(115,161,199,0.8) 5%, rgba(43,109,163,0.8) 80%);' : dateFns.isSameDay(day, selectedDate) ? 'rgba(255, 255, 255, 0.3)' : "" } `,
                            borderColor: `${dateFns.isSameDay(day, selectedDate) ? 'rgba(255,255,255)' : '' }`
                        }]}>
                            <span style={{ alignSelf: 'end' }}>{formattedDay}</span>
                        </Button>
                    </ListItem>
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <List disablePadding={true} key={day} sx={{ display: 'flex', flexDirection: 'row' }}>
                    {days}
                </List>
            );
            days = [];
        }
        return <List disablePadding={true} sx={{ zIndex: 4 }}>{rows}</List>
    }


    function header() {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'row', mb: 3 }}>
                <Box sx={start}>
                    <Box onClick={prevMonth} sx={{ cursor: 'pointer' }}>
                        <Icon>
                            <ArrowBackIosNewIcon />
                        </Icon>
                    </Box>
                </Box>
                <Box sx={center}>
                    <span>{dateFns.format(state.currentMonth, 'MMM Y')}</span>
                </Box>
                <Box sx={end}>
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
            {week()}
            {cells()}
        </>
    )
}
