import React, { useCallback, useState } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import upload, { UploadResults } from './upload';

const Uploader: React.FC<{
  value: string;
  onChange: (v: UploadResults | string) => void;
}> = ({ value, onChange }) => {
  const [loading, setLoading] = useState(false);
  const handleUpload = useCallback(async () => {
    setLoading(true);
    const results1 = await upload();
    onChange(results1);
    setLoading(false);
  }, [onChange]);
  return (
    <TextField
      disabled={loading}
      fullWidth
      placeholder="Upload file to get a URL"
      value={loading ? 'Uploading...' : value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleUpload} disabled={loading}>
              <UploadFileIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Uploader;
