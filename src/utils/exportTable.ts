import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import _ from 'lodash';
import dayjs from 'dayjs';
import { formatNumber } from './formatNumber';

interface jsPDFCustom extends jsPDF {
  autoTable: (options: UserOptions) => void;
}

// export const fileType =
//   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

const formatItemValue = item => {
  let newItem = item;
  for (const key in newItem) {
    if (
      key.toLowerCase().includes('date') ||
      key.toLowerCase().includes('time')
    ) {
      newItem[key] = newItem[key]
        ? dayjs(newItem[key]).format('DD/MM/YYYY HH:mm:ss')
        : newItem[key];
    }
    if (key.toLowerCase().includes('amount')) {
      newItem[key] = formatNumber(newItem[key]);
    }
  }
  return newItem;
};

export const exportTable = (tableHeader, tableData, fileName, fileType) => {
  const data = tableData.map(item => {
    let newItem = formatItemValue(item);
    if (item?.transactionRemittances?.remittanceProofs) {
      if (!_.isEmpty(item?.transactionRemittances?.remittanceProofs)) {
        const remittanceProofs =
          item?.transactionRemittances?.remittanceProofs.map(
            remittanceProof => remittanceProof?.proofFile
          );
        let updatedItem = newItem;
        updatedItem.transactionRemittances = remittanceProofs.toString();
        return _.valuesIn(updatedItem);
      } else {
        let updatedItem = newItem;
        updatedItem.transactionRemittances = '';
        return _.valuesIn(updatedItem);
      }
    }
    return _.valuesIn(newItem);
  });

  if (fileType === '.pdf') {
    const unit = 'pt';
    const size = 'A1'; // Use A1, A2, A3 or A4
    const orientation = 'portrait';
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size) as jsPDFCustom;

    doc.setFontSize(14);
    const headers = [tableHeader];

    let content = {
      startY: 75,
      head: headers,
      body: data
    };
    doc.text(_.startCase(fileName), marginLeft, 40);
    doc.autoTable(content);
    doc.save(fileName + fileType);
  } else {
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.sheet_add_aoa(ws, [tableHeader], { origin: 'A1' });
    ws['!cols'] = [{ wch: 10 }];
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    XLSX.writeFile(wb, fileName + fileType);
  }
};
