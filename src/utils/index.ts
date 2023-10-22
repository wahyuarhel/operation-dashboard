import JSZip from "jszip";
import saveAs from 'file-saver';
import dayjs from "dayjs";

function downloadZipFile(filename: string, urls: any[]) {
  if (!urls) return;
  const zip = new JSZip();
  const folder = zip.folder(filename); // folder name where all files will be placed in
  urls.forEach(url => {
    const blobPromise = fetch(url).then(r => {
      if (r.status === 200) return r.blob();
      return Promise.reject(new Error(r.statusText));
    });
    const name = url.substring(url.lastIndexOf('/') + 1);
    folder?.file(name, blobPromise);
  });
  zip.generateAsync({ type: 'blob' }).then(blob => saveAs(blob, filename));
};

function downloadFile(url: string, filename: string) {
  saveAs(url, filename)
}

function formatNumber(number: number | any): string {
  return Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(number);
}

const convertToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

function formatDateAndTime(date: string) {
  return dayjs(date).format('DD/MM/YYYY HH:mm:ss')
}

function formatDate(date: string) {
  return dayjs(date).format('DD/MM/YYYY')
}

export {
  downloadZipFile,
  downloadFile,
  formatNumber,
  convertToBase64,
  formatDateAndTime,
  formatDate
}

// export default Helper