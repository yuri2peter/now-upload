import { Card, Link, Typography } from '@mui/material';
import React from 'react';
import { SERVER_ORIGIN } from 'src/configs';
import { UploadResults } from './upload';

const Results: React.FC<{ results: UploadResults }> = ({ results: r }) => {
  const url = SERVER_ORIGIN + '/' + r.newFilename;
  return (
    <Card sx={{ padding: 2, boxShadow: 'none', border: '1px solid #dcdcdc' }}>
      <Link href={url}>
        <Typography variant="body2">{url}</Typography>
      </Link>
      <Typography variant="body2">
        Original Filename: {r.originalFilename}
      </Typography>
      <Typography variant="body2">New Filename: {r.newFilename}</Typography>
      <Typography variant="body2">Size: {r.size}</Typography>
      <Typography variant="body2">Mime Type: {r.mimetype}</Typography>
    </Card>
  );
};

export default Results;
