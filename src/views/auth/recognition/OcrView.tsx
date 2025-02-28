import { ImageCanvas, ImageCapture } from '@/components';
import { useCredentialStore } from '@/hooks';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { RefObject, forwardRef, useImperativeHandle, useRef } from 'react';
import Swal from 'sweetalert2';
// import Webcam from 'react-webcam';

type ImageViewRef = {
  onCapture: () => void;
};

interface imageProps {
  imageRef: RefObject<HTMLImageElement>;
  canvasImageRef: RefObject<HTMLCanvasElement>;
  image: string | null;
  setImage: (image: string) => void;
  webcamRef: any;
  canvasWebcamRef: RefObject<HTMLCanvasElement>;
  isIdentityCard: (state: boolean) => void;
}

export const OcrView = forwardRef((props: imageProps, ref) => {
  const { imageRef, canvasImageRef, image, setImage, webcamRef, canvasWebcamRef, isIdentityCard } = props
  const { identityCard } = useCredentialStore();
  // OCR
  const imageCaptureRef = useRef<ImageViewRef | null>(null);
  useImperativeHandle(ref, () => ({
    onCapture: () => imageCaptureRef.current!.onCapture(),
  }));

  // Función para verificar si dos cadenas están dentro del rango de error permitido
  const isWithinErrorRange = (texto1: string, str2: string): boolean => {
    const texto2 = str2.replace(/[^a-zA-Z0-9-]/g, '');
    console.log('ci consultado', texto1)
    console.log('texto obtenido', texto2)
    if (texto2.includes(texto1)) return true;
    let coincidencia = 0;
    for (let i = 0; i < texto2.length; i++) {
      for (let j = 0; j < texto1.length; j++) {
        if (texto2[i] === texto1[j] && texto2[i + 1] === texto1[j + 1]) {
          coincidencia++
        }
      }
    }
    if (coincidencia < texto1.length - 3) {
      return false;
    }
    return true;
  }
  const handleImageCapture = (image: string, text: string) => {
    setImage(image);
    if (isWithinErrorRange(identityCard, text)) {
      isIdentityCard(true);
    } else {
      Swal.fire('Intente nuevamente', 'No coincide con el numero de carnet de identidad', 'error');
      isIdentityCard(false);
    }
  }
  return (
    <Stack spacing={2} style={{ width: '45vh' }} sx={{ paddingLeft: 5 }}>
      <Typography style={{ fontSize: '1.5vw' }} >
        Coloque su Cédula de identidad
      </Typography>
      {
        image == null ?
          <ImageCapture
            onChange={handleImageCapture}
            ref={imageCaptureRef}
            webcamRef={webcamRef}
            canvasWebcamRef={canvasWebcamRef}
          /> :
          <ImageCanvas
            imageRef={imageRef}
            canvasImageRef={canvasImageRef}
            src={image}
          />
      }
    </Stack>
  )
})
