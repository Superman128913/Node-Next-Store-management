import React, { useEffect, useState } from 'react';
import { useQRCode } from 'next-qrcode';

const QRGenerator = props => {
  const { info, imgId } = props;
  const [width, setWidth] = useState(1366); // default width, detect on server.
  const [height, setHeight] = useState(768); // default height, detect on server.

  const { Canvas } = useQRCode();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    // Check if the page has already loaded
    if (document.readyState === 'complete') {
      handleResize();
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <div id={imgId}>
      <Canvas
        text={info}
        options={{
          type: 'image/jpeg',
          quality: 0.3,
          level: 'M',
          margin: 3,
          scale: 4,
          width: (Math.min(width, height) * 3) / 4
        }}
      />
    </div>
  );
};

export default QRGenerator;
