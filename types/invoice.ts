export interface InvoiceItem {
  id: string;
  particular: string;
  areaQuantity: string;
  rate: number;
  amount: number;
}

export interface InvoiceData {
  // Company details
  companyName: string;
  companyAddress: string;
  companyphone :string;
  // Invoice details
  invoiceNo: string;
  invoiceDate: string;
  contractDate: string;
  contactNo: string;
  servicePeriod: string;

  // Customer details
  customerName: string;
  customerAddress: string;
  customerMobile: string;

  // Payment details
  bankName: string;
  branchAddress: string;
  accountNumber: string;
  ifscCode: string;

  // Invoice items
  items: InvoiceItem[];

  // Totals
  subtotal: number;
  total: number;
  totalInWords: string;

  // Warranty certificate details ✅

}


export const createEmptyInvoice = (): InvoiceData => ({
  companyName: 'PEST PRO SOLUTIONS',
  companyAddress: 'Near Jeevan Jyoti Hospital, Patel Nagar, Chhindwara 480001',
  companyphone :'7987449147',
  invoiceNo: '',
  invoiceDate: new Date().toISOString().split('T')[0],
  contractDate: '',
  contactNo: '',
  servicePeriod: '',

  customerName: '',
  customerAddress: '',
  customerMobile: '',

  bankName: 'Kotak Mahindra Bank',
  branchAddress: 'Sarra Chhindwara 480001',
  accountNumber: '0214166998',
  ifscCode: 'KKBK0005914',

  items: [
    {
      id: '1',
      particular: '',
      areaQuantity: '',
      rate: 0,
      amount: 0,
    },
  ],
  subtotal: 0,
  total: 0,
  totalInWords: '',

  // Warranty fields ✅
 
});


export const createEmptyItem = (): InvoiceItem => ({
  id: Math.random().toString(36).substr(2, 9),
  particular: '',
  areaQuantity: '',
  rate: 0,
  amount: 0
});