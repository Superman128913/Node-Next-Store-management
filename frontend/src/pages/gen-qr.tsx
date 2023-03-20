import { withMainLayoutPage } from '@/modules/shared/components/layouts/page/Main';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Typography } from '@mui/material';
import FullLayout from '@/layouts/full-layout';
import QRGenerator from '@/components/QRGenerator';

const GeneratePDF = dynamic(() => import('@/components/PDFGenerator'), { ssr:false });

const GenQRCode = () => {
  const qrImageKey = 'qr-image';
  const [StoreID, setStoreID] = useState('');

  const GetStoreID = async() => {
    const store = localStorage.getItem('SelectedStore');
    if (store && store !== undefined)
    {
      const store_id = JSON.parse(store)['_id'];
      setStoreID(store_id);
    } else {
      setStoreID('');
    }
  };

  useEffect(() => {
    GetStoreID();
    window.addEventListener('selectStore', () => {
      GetStoreID();
    });
    return () => {
      window.removeEventListener('selectStore', () => {
        GetStoreID();
      });
    };
  }, []);

  if (StoreID)
    return (
      <FullLayout>
        <GeneratePDF imgId={qrImageKey} />
        <Box sx={{ m: 5, textAlign: 'center' }}>
          <QRGenerator info={window.location.origin + '/create-review/' + StoreID} imgId={qrImageKey} />
        </Box>
      </FullLayout>
    );
  else
    return (
      <FullLayout>
        <Box sx={{ m: 5, textAlign: 'center' }}>
          <Typography variant="h1">No Selected Store</Typography>
        </Box>
      </FullLayout>
    );
};

export default withMainLayoutPage(GenQRCode, {
  title: 'Generate QR Code'
});
