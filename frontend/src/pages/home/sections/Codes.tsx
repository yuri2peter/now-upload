import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import React from 'react';

const Code: React.FC<{ value: string }> = ({ value }) => {
  return (
    <CodeMirror
      style={{
        fontSize: '13px',
        borderRadius: '4px',
        overflow: 'auto',
        maxHeight: '100%',
      }}
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
    </>
  );
};
const code1 = `// NowUploader.tsx
// Importing necessary libraries
import { AxiosInstance } from 'axios';
import React, { ComponentPropsWithoutRef, useCallback, useState } from 'react';
import { SERVER_ORIGIN } from 'src/configs';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import axiosServices from 'src/utils/axios';
import { IconButton, InputAdornment, TextField } from '@mui/material';

// Defining the interface for the results obtained on upload
export interface UploadResults {
  mimetype: string;
  newFilename: string;
  originalFilename: string;
  size: number;
}

// Interface for the component props
interface Props {
  disableAutoFill?: boolean;
  value: string;
  onChange: (v: string) => void;
  onUploadBegin?: () => void;
  onUploadSucceed?: (v: UploadResults) => void;
  onUploadCancelled?: () => void;
  onUploadFailed?: (e: unknown) => void;
  onUploadEnd?: () => void;
  textFieldProps?: Partial<ComponentPropsWithoutRef<typeof TextField>>;
  serverOrigin?: string;
  axiosInstance?: AxiosInstance;
}

// Functional component for file uploader
const NowUploader: React.FC<Props> = ({
  disableAutoFill = false, // Disable form auto-fill after file upload
  value,
  onChange,
  onUploadBegin = () => {},
  onUploadSucceed = () => {},
  onUploadCancelled = () => {},
  onUploadFailed = (e) => {
    console.error(e);
    alert('Error: Upload Failed.');
  },
  onUploadEnd = () => {},
  textFieldProps = {},
  serverOrigin = SERVER_ORIGIN,
  axiosInstance = axiosServices,
}) => {
  // State management
  const [loading, setLoading] = useState(false);

  // Function to handle the upload process
  const handleUpload = useCallback(async () => {
    setLoading(true);
    onUploadBegin();
    try {
      // Call the upload function
      const results = await upload(serverOrigin, axiosInstance);
      if (results) {
        onUploadSucceed(results);
        if (!disableAutoFill) {
          onChange(serverOrigin + '/' + results.newFilename);
        }
      } else {
        onUploadCancelled();
      }
    } catch (err) {
      onUploadFailed(err);
    }
    setLoading(false);
    onUploadEnd();
  }, [
    disableAutoFill,
    onChange,
    onUploadBegin,
    onUploadSucceed,
    onUploadCancelled,
    onUploadFailed,
    onUploadEnd,
    serverOrigin,
    axiosInstance,
  ]);

  // Return the file uploader component
  return (
    <TextField
      disabled={loading}
      fullWidth
      placeholder="Upload file to get a URL"
      value={value}
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
      {...textFieldProps}
    />
  );
};

// Export the component as default
export default NowUploader;

// Function to handle file upload operations
function upload(
  serverOrigin = SERVER_ORIGIN,
  axiosInstance = axiosServices
): Promise<UploadResults | null> {
  return new Promise((resolve, reject) => {
    let fileCancle = true;
    // Create a hidden input element and open the file picker dialog
    const elInput = document.createElement('input');
    elInput.type = 'file';
    elInput.style.display = 'none';
    document.body.append(elInput); // For iOS compatibility, must be mounted to body
    // Listen for cancel actions
    window.addEventListener(
      'focus',
      () => {
        setTimeout(() => {
          if (fileCancle) {
            // Cancel handing logic
            resolve(null);
          }
        }, 100);
      },
      { once: true }
    );
    elInput.onchange = () => {
      fileCancle = false;
      const file = elInput?.files?.[0];
      if (file) {
        const form = new FormData();
        form.append('file', file);
        // Initiate the upload
        axiosInstance
          .post(serverOrigin + '/api/upload', form)
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
      } else {
        reject('cancelled upload');
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
