'use client';

import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { InvoiceData } from '@/types/invoice';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
    flexDirection: 'column',
    border: '2pt solid #000',
    backgroundColor: '#fff',
    position: 'relative',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bolder',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 28,
    letterSpacing: 1.5,
  },
  companylogo:{
    fontWeight: 'bold',
    fontSize:15,
    marginTop : 5, 
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  fieldBlock: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: '#444',
    marginBottom: 4,
  },
  value: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#111',
  },
  bodyText: {
    textAlign: 'center',
    marginHorizontal: 40,
    marginBottom: 40,
    lineHeight: 1.6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 60,
    marginTop: 20,
    alignItems: 'center',
  },
  signatureBlock: {
    alignItems: 'center',
  },
  line: {
    marginTop: 10,
    height: 1,
    backgroundColor: '#000',
    width: 120,
  },
  sealContainer: {
    alignItems: 'center',
  },
  seal: {
    width: 60,
    height: 80,
  },
  corner: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#2e1f84',
    zIndex: -1,
  },
  topLeft: {
    top: 0,
    left: 0,
    transform: 'rotate(45deg)',
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    transform: 'rotate(45deg)',
  },
});

const CertificatePDF = ({ data }: { data: InvoiceData }) => {
  const warrantyData = {
    productName: data.items.map(item => item.particular).join(', '),
    startDate: data.contractDate,
    endDate: data.servicePeriod,
    issueDate: data.invoiceDate,
    serialNumber: data.invoiceNo,
    signature: 'Authorized Signature',
  };

  return (
    <Document>
     <Page size="A4" orientation="landscape" style={styles.page} wrap={false}>

        {/* Decorative Corners */}
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image style={styles.logo} src="/logo.png" />
        </View>

        {/* Title */}
        <Text style={styles.title}>CERTIFICATE</Text>
        <Text style={styles.subtitle}>OF WARRANTY</Text>

        {/* Field Section */}
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.fieldBlock}>
              <Text style={styles.label}>Customer Name</Text>
              <Text style={styles.value}>{data.customerName}</Text>
            </View>
            <View style={styles.fieldBlock}>
              <Text style={styles.label}>Address</Text>
              <Text style={styles.value}>{data.customerAddress}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.fieldBlock}>
              <Text style={styles.label}>Services</Text>
              <Text style={styles.value}>{warrantyData.productName}</Text>
            </View>
            <View style={styles.fieldBlock}>
              <Text style={styles.label}>Serial No.</Text>
              <Text style={styles.value}>{warrantyData.serialNumber}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.fieldBlock}>
              <Text style={styles.label}>Start Date</Text>
              <Text style={styles.value}>{warrantyData.startDate}</Text>
            </View>
            <View style={styles.fieldBlock}>
              <Text style={styles.label}>End Date</Text>
              <Text style={styles.value}>{warrantyData.endDate}</Text>
            </View>
          </View>
        </View>

        {/* Body Text */}
        <Text style={styles.bodyText}>
  We hereby guarantee and warranty all pest control services provided for the stated duration. The service has
  been carried out at the customer's premises. Pest Pro Solutions will reservice or rectify any issues arising
  from ineffective treatment, at no additional cost to the customer, within the warranty period.
</Text>


        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.signatureBlock}>
            <Text>Date: {warrantyData.issueDate}</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.sealContainer}>
            <Image style={styles.seal} src="/gold-medal.png" />
          </View>
          <View style={styles.signatureBlock}>
            <Text>{warrantyData.signature}</Text>
            
            <Text style={styles.companylogo} >Pest Pro Solutions</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CertificatePDF;
