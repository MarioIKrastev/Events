export const styles = {
    card: {
        padding: "1rem 3rem 3rem", 
        background: 'linear-gradient(to right bottom,rgba(255, 255, 255, 0.6),rgba(255, 255, 255, 0.3))',
        backdropFilter: 'blur(50px)', 
        borderRadius: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        '&::before': {
          content: '""',
          // background: 'rgba(255, 255, 255)',
          background: 'linear-gradient(to right top,rgba(43, 109, 163, 0.9),rgba(255, 255, 255, 0.1))',
          backdropFilter: 'blur(40px)',
          boxShadow: 'rgb(216, 230, 233, 0.5) 1px 1px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset',
          height: '20rem',
          width: '20rem',
          position: 'absolute',
          top: '35%',
          right: '50%',
          borderRadius: '50%',
        },
        '&::after': {
          content: '""',
          background: 'rgba(255, 255, 255, 0.5)',
          height: '1.5rem',
          width: '1.5rem',
          position: 'absolute',
          top: '45%',
          right: '73%',
          borderRadius: '50%',
          zIndex: -1,
        },
      },
}