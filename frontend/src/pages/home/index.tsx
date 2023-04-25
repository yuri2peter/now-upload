import React, { useCallback, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { SERVER_ORIGIN } from 'src/configs';
import Results from './sections/Results';
import Codes from './sections/Codes';
import NowUploader, { UploadResults } from 'src/components/NowUploader';

const HomePage = () => {
  const [showCodes, setShowCodes] = useState(false);
  const [value, setValue] = useState('');
  const [results, setResults] = useState<null | UploadResults>(null);
  const handleChange = useCallback(setValue, [setValue]);
  const handleUpload = useCallback((v: UploadResults) => {
    if (typeof v === 'string') {
      setValue(v);
    } else {
      setResults(v);
      setValue(SERVER_ORIGIN + '/' + v.newFilename);
    }
  }, []);
  return (
    <Box
      sx={{
        margin: '0 auto',
        maxWidth: 640,
        padding: 3,
        paddingTop: 8,
        height: 1,
      }}
    >
      <Stack spacing={2} justifyContent={'center'} height={1}>
        <Typography variant="h3" align="center">
          Now Upload!
        </Typography>
        <Box>
          <NowUploader
            value={value}
            onChange={handleChange}
            onUploadSucceed={handleUpload}
            disableAutoFill
          />
        </Box>
        {results && <Results results={results} />}
        {showCodes ? (
          <Codes />
        ) : (
          <>
            <Button
              onClick={() => {
                setShowCodes(true);
              }}
            >
              SHOW DEMO CODE
            </Button>
            <Box height={150}></Box>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default HomePage;
