import React, { useRef } from 'react';
import './styles.scss';

function FileUploader() {
  const fileRef = useRef<any>();
  const [fileName, setFileName] = React.useState<string>('');

  const handleChange = e => {
    const [file] = e.target.files;
    setFileName(file.name);
  };

  return (
    <div style={{ width: '200px' }}>
      <label id='button-upload-file' onClick={() => fileRef.current.click()}>
        {fileName !== '' ? fileName : 'Browse a file'}
      </label>
      <input ref={fileRef} onChange={handleChange} type='file' hidden />
    </div>
  );
}

export default FileUploader;
