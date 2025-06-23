'use client';

import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { InvoiceData } from '@/types/invoice';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 0,
    fontSize: 12,
    fontFamily: 'Helvetica',
    position: 'relative',
    backgroundColor: '#ffffff',
  },
  borderFrame: {
    margin: 20,
    padding: 40,
    border: '1pt solid black',
    flexGrow: 1,
    position: 'relative',
    zIndex: 0,
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
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 28,
    letterSpacing: 2,
  },
  companylogo: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 5,
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
    fontSize: 11.5,
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

  // Triangle Decorations (above everything)
  triangle: {
    position: 'absolute',
    width: 40,
    height: 100,
    
    zIndex: 20, // On top of border
  },
  darkTopLeft: {
    backgroundColor: '#2e1f84',
    top: 0,
    left: 30,
  },
  darkTopLeft2: {
    backgroundColor: '#c6d5f8',
    top: 0,
    left: 80,
    height: 50,
  },
  lightBottomRight: {
    backgroundColor: '#c6d5f8',
    bottom: 0,
    right: 30,
  },
   lightBottomRight2: {
    backgroundColor: '#2e1f84',
    bottom: 0,
    right: 80,
    height: 50,
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
        {/* Colored Corner Triangles (above border) */}
        <View style={[styles.triangle, styles.darkTopLeft]} />
        <View style={[styles.triangle, styles.lightBottomRight]} />


        {/* Certificate Content Inside Framed Box */}
           <View style={styles.borderFrame}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} src="/logo.png" />
          </View>

          <Text style={styles.title}>CERTIFICATE</Text>
          <Text style={styles.subtitle}>OF WARRANTY</Text>

          {/* Info Fields */}
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

          {/* Warranty Text */}
          <Text style={styles.bodyText}>
            We hereby guarantee and warranty all pest control services provided for the stated duration.
            The service has been carried out at the customer's premises. Pest Pro Solutions will reservice
            or rectify any issues arising from ineffective treatment, at no additional cost to the customer
            within the warranty period.
          </Text>

          {/* Signature Section */}
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
              <View style={styles.line} />
              <Text style={styles.companylogo}>Pest Pro Solutions</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CertificatePDF;
