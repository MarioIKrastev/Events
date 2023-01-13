export const styles = {
    pseudoGrid: {
        position: 'relative',
        '&::before': {
            content: '""',
            background: 'linear-gradient(to right top,rgba(43, 109, 163, 0.9),rgba(255, 255, 255, 0.1))',
            boxShadow: 'rgb(216, 230, 233, 0.5) 1px 1px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset',
            height: '20rem',
            width: '20rem',
            position: 'absolute',
            bottom: '45%',
            left: '50%',
            borderRadius: '50%',
        },
        '&::after': {
            content: '""',
            background: 'rgba(255, 255, 255, 0.1)',
            height: '1.5rem',
            width: '1.5rem',
            position: 'absolute',
            bottom: '105%',
            left: '65%',
            borderRadius: '50%',
            zIndex: 1,
        }
    }
}