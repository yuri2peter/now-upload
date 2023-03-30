import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import React from 'react';

const Code: React.FC<{ value: string }> = ({ value }) => {
  return (
    <CodeMirror
      style={{ fontSize: '13px', borderRadius: '4px', overflow: 'hidden' }}
      value={value}
      extensions={[javascript({ jsx: true, typescript: true })]}
      theme="dark"
      editable={false}
      readOnly
    />
  );
};

const Codes: React.FC = () => {
  return (
    <>
      <Code value={code1} />
      <Code value={code2} />
    </>
  );
};
const code1 = `// Uploader.tsx
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
    try {
      const results1 = await upload();
      onChange(results1);
    } catch (err) {
      alert('Error: Upload Failed.');
    }
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
`;
const code2 = `// upload.ts
import axios from 'axios';
import { SERVER_ORIGIN } from 'src/configs';

export interface UploadResults {
  mimetype: string;
  newFilename: string;
  originalFilename: string;
  size: number;
}

export default function upload(): Promise<UploadResults> {
  return new Promise((resolve, reject) => {
    // Generate a hidden input and open it
    const elInput = document.createElement('input');
    elInput.type = 'file';
    elInput.style.display = 'none';
    // Compatible with IOS and must be attached to body
    document.body.append(elInput);
    elInput.onchange = () => {
      const file = elInput?.files?.[0];
      if (file) {
        const form = new FormData();
        form.append('file', file);
        // upload the file
        axios
          .post(SERVER_ORIGIN + '/api/upload', form)
          .then(({ data }) => {
            const { mimetype, newFilename, originalFilename, size } = data;
            resolve({
              mimetype,
              newFilename,
              originalFilename,
              size,
            } as UploadResults);
          })
          .catch(reject);
      }
      setTimeout(() => {
        document.body.removeChild(elInput);
      }, 0);
    };
    elInput.click();
  });
}
`;

export default Codes;
