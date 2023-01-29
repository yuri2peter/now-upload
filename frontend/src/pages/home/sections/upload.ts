import { SERVER_ORIGIN } from 'src/configs';
import axiosServices from 'src/utils/axios';

export interface UploadResults {
  mimetype: string;
  newFilename: string;
  originalFilename: string;
  size: number;
}

export default function upload(): Promise<UploadResults> {
  return new Promise((resolve, reject) => {
    // 生成一个隐藏的input框并打开
    const elInput = document.createElement('input');
    elInput.type = 'file';
    elInput.style.display = 'none';
    document.body.append(elInput); // 兼容IOS，必须挂载到body
    elInput.onchange = () => {
      const file = elInput?.files?.[0];
      if (file) {
        const form = new FormData();
        form.append('file', file);
        // 发起上传
        axiosServices
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
