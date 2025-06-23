'use client';

import { useState } from 'react';
import { InvoiceData } from '@/types/invoice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Loader2 } from 'lucide-react';
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';

interface PDFGeneratorProps {
  data: InvoiceData;
}
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf', // Regular
    },
    {
      src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc4.ttf', // Bold
      fontWeight: 'bold',
    },
  ],
});



const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 10,
    fontFamily: 'Helvetica',
    lineHeight: 1.6,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 60,
    marginBottom: 10,
  },
  companyName: {
   fontSize: 16,
   fontWeight: 'bold',   
   marginBottom: 5,
  },
  invoiceInfo: {
    textAlign: 'right',
    width: 200,
  },
  invoiceNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  detailsColumn: {
    flex: 1,
    marginRight: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 5,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#eaeaea',
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderBottom: '1px solid #d0d0d0',
  },
  col1: { width: '40%' },
  col2: { width: '20%' },
  col3: { width: '20%' },
  col4: { width: '20%' },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
  },
  totalText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    paddingHorizontal: 20,
  },
  signatureBox: {
    textAlign: 'center',
    width: 150,
  },
  signatureLine: {
    borderTop: '1pt solid black',
    marginBottom: 5,
  },
  textSmall: {
    fontSize: 8,
  },
});

const InvoicePDF = ({ data }: { data: InvoiceData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.headerRow}>
        <View style={{ flex: 1 }}>
         <Image style={styles.logo} src="/logo.png" />
          
          <Text style={styles.companyName}>{data.companyName || 'PEST PRO SOLUTIONS'}</Text>
          <Text>Address:</Text>
          <Text>{data.companyAddress || 'Near Jeevan Jyoti Hospital, Patel Nagar, Chhindwara 480001'}</Text>
          <Text>Phone: {data.companyphone || '7987449147'}</Text>

        </View>
        <View style={styles.invoiceInfo}>
          <Text style={styles.invoiceNumber}>INVOICE NO: {data.invoiceNo || '___'}</Text>
          <Text>INVOICE DATE: {data.invoiceDate ? new Date(data.invoiceDate).toLocaleDateString() : '___'}</Text>
          <Text>CONTRACT DATE: {data.contractDate ? new Date(data.contractDate).toLocaleDateString() : '___'}</Text>
          <Text>SERVICE PERIOD: {data.servicePeriod ? new Date(data.servicePeriod).toLocaleDateString() : '___'}</Text>
        </View>
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.detailsColumn}>
          <Text style={styles.sectionTitle}>Customer Details</Text>
          <Text>Name: {data.customerName || '___'}</Text>
          <Text>Address: {data.customerAddress || '___'}</Text>
          <Text>Mobile No: {data.customerMobile || '___'}</Text>
        </View>
        <View style={styles.detailsColumn}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <Text>{data.companyName || 'Pest Pro Solutions'}</Text>
          <Text>Bank Name: {data.bankName || 'Kotak Mahindra Bank'}</Text>
          <Text>Branch Add: {data.branchAddress || 'Sarra Chhindwara 480001'}</Text>
          <Text>Account Number: {data.accountNumber || '0214166998'}</Text>
          <Text>IFSC Code: {data.ifscCode || 'KKBK0005914'}</Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.col1}>Particular</Text>
          <Text style={styles.col2}>Area/Quantity</Text>
          <Text style={styles.col3}>Rate Rs.</Text>
          <Text style={styles.col4}>Amount Rs.</Text>
        </View>
        {data.items?.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={styles.col1}>{item.particular}</Text>
            <Text style={styles.col2}>{item.areaQuantity}</Text>
            <Text style={styles.col3}>
                    
              {item.rate?.toFixed(2)}</Text>
            <Text style={styles.col4}>{item.amount?.toFixed(2)}</Text>
          </View>
        ))}
        {Array.from({ length: Math.max(0, 3 - (data.items?.length || 0)) }).map((_, index) => (
          <View key={`empty-${index}`} style={styles.tableRow}>
            <Text style={styles.col1}></Text>
            <Text style={styles.col2}></Text>
            <Text style={styles.col3}></Text>
            <Text style={styles.col4}></Text>
          </View>
        ))}
      </View>

      <View style={styles.totalSection}>
        <Text>In words rate: {data.totalInWords || 'Zero Rupees Only'}</Text>
        <Text style={styles.totalText}>Total Rs : {data.total?.toFixed(2) || '0.00'}</Text>
      </View>

      <View style={styles.signatureSection}>
        <View style={styles.signatureBox}>
          <View style={styles.signatureLine} />
          <Text>Receiver’s Sign</Text>
        </View>
        <View style={styles.signatureBox}>
          <Text>{data.companyName || 'Pest Pro Solutions'}</Text>
          <Text style={styles.textSmall}>Authorized Signature</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export function PDFGenerator({ data }: PDFGeneratorProps) {
  const fileName = `Invoice-${data.invoiceNo || 'Draft'}-${new Date().toISOString().split('T')[0]}.pdf`;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <FileText className="w-6 h-6" />
            PDF Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-center space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Generate Your Invoice PDF?</h3>
            <p className="text-gray-600">Click the button below to download your professionally formatted invoice as a PDF document.</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Invoice Summary:</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p><strong>Invoice No:</strong> {data.invoiceNo || 'Not specified'}</p>
              <p><strong>Customer:</strong> {data.customerName || 'Not specified'}</p>
              <p><strong>Total Amount:</strong> ₹{data.total?.toFixed(2) || '0.00'}</p>
              <p><strong>Items:</strong> {data.items?.length || 0} item(s)</p>
            </div>
          </div>

          <PDFDownloadLink
            document={<InvoicePDF data={data} />}
            fileName={fileName}
          >
            {
              (({ loading }: { loading: boolean }) => (
                <Button
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      Download Invoice PDF
                    </>
                  )}
                </Button>
              )) as unknown as React.ReactElement
            }
          </PDFDownloadLink>

          <div className="text-xs text-gray-500 space-y-1">
            <p>• PDF will be downloaded as: <code className="bg-gray-100 px-1 rounded">{fileName}</code></p>
            <p>• The PDF matches your original invoice format</p>
            <p>• All form data is automatically saved in your browser</p>
            <p>• Designed and Developed By Aehterix Technologies</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
