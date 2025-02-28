import { Box, Grid, Typography } from "@mui/material";
import logo from '@/assets/images/muserpol_casa.jpg';
import imageLogo from '@/assets/images/muserpol.png';
import { useEffect, useState } from "react";
import { useCredentialStore } from "@/hooks";

export const HomeScreen = () => {

  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  const { changeStep } = useCredentialStore();

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      onClick={() => { changeStep('identityCard') }}
      style={{ height: `${screenHeight}px` }}
    >
      <Grid container>
        <Grid item container sm={6}
          direction="column"
          justifyContent="center" >
          <Box display="flex" justifyContent="center">
            <img src={imageLogo} alt="Descripción de la imagen" style={{ width: '40vw' }} />
          </Box>
          <Typography sx={{ p: 2 }} align="center" style={{ fontSize: '3.5vw', fontWeight: 500 }}>
            Punto de consulta de trámites
          </Typography>
        </Grid>
        <Grid item sm={6}>
          <Box
            component="img"
            sx={{
              height: `${screenHeight}px`,
              width: '100%',
              objectFit: 'cover',
              display: 'flex',
              filter: 'brightness(0.7)',
            }}
            alt="The house from the offer."
            src={logo}
          />
        </Grid>
      </Grid>
    </div>
  );
};
