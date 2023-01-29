import { Box, Link, Typography } from '@mui/material';
import React from 'react';
import { SERVER_ORIGIN } from 'src/configs';
import { UploadResults } from './upload';

const Results: React.FC<{ results: UploadResults }> = ({ results: r }) => {
  const url = SERVER_ORIGIN + '/' + r.newFilename;
  return (
    <Box>
      <Link href={url}>
        <Typography variant="body2">{url}</Typography>
      </Link>
      <Typography variant="body2">
        Original Filename: {r.originalFilename}
      </Typography>
      <Typography variant="body2">New Filename: {r.newFilename}</Typography>
      <Typography variant="body2">Size: {r.size}</Typography>
      <Typography variant="body2">Mime Type: {r.mimetype}</Typography>
    </Box>
  );
};

export default Results;
