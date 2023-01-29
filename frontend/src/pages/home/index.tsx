import React, { useCallback, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Uploader from './sections/Uploader';
import { SERVER_ORIGIN } from 'src/configs';
import { UploadResults } from './sections/upload';
import Results from './sections/Results';

const HomePage = () => {
  const [value, setValue] = useState('');
  const [results, setResults] = useState<null | UploadResults>(null);
  const handleChange = useCallback((v: UploadResults | string) => {
    if (typeof v === 'string') {
      setValue(v);
    } else {
      setResults(v);
      setValue(SERVER_ORIGIN + '/' + v.newFilename);
    }
  }, []);

  return (
    <Box sx={{ margin: '0 auto', maxWidth: 480, padding: 3, paddingTop: 8 }}>
      <Stack spacing={2}>
        <Typography variant="h3" align="center">
          Now Upload!
        </Typography>
        <Box>
          <Uploader value={value} onChange={handleChange} />
        </Box>
        <Box>{results && <Results results={results} />}</Box>
      </Stack>
    </Box>
  );
};

export default HomePage;
