import React from 'react';
import { jsPDF, HTMLOptionImage } from 'jspdf';
// import { toPng, toCanvas } from 'html-to-image';
import { Box, Button } from '@mui/material';
type props = {
  // html?: React.MutableRefObject<HTMLDivElement>;
  imgId: string;
};

const GeneratePdf: React.FC<props> = ({ imgId }) => {
  const generatePdf = async() => {
    const doc = await new jsPDF();

    // const split = doc.splitTextToSize(
    //   document.getElementById('text').innerText,
    //   200
    // );
    const canvas = document.getElementById(imgId).children[0] as HTMLCanvasElement;
    const image = new Image();
    const width = 210;
    image.src = canvas?.toDataURL('image/jpeg', 1.0);
    // doc.text(document.querySelector('.content > h1').innerHTML, 75, 5);
    doc.addImage(image, width / 10, 45, width * 8 / 10, width * 8 / 10);
    // doc.text(split, 5, 75);
    doc.output('dataurlnewwindow', { filename: 'QR Code' });
  };

  // const generateImage = async() => {
  //   const image = await toPng(html.current, { quality: 0.95 });
  //   const doc = new jsPDF();

  //   doc.addImage(image, 'JPEG', 5, 22, 200, 160);
  //   doc.save();
  // };
  return (
    <Box
      sx={{
        display: 'flex'
      }}
    >
      <Box flexGrow={1} />
      <Button
        variant="contained"
        color="primary"
        size="medium"
        sx={{ fontSize: 18 }}
        onClick={generatePdf}
      >
        Export PDF
      </Button>
    </Box>
  );
};

export default GeneratePdf;
