'use client';

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CertificatePDF from './CertificatePDF';
import { InvoiceData } from '@/types/invoice';

interface Props {
  data: InvoiceData;
}

const WarrantyCertificate = ({ data }: Props) => {
  const productName = data.items.map(item => item.particular).join(', ');
  const serialNo = data.invoiceNo || '—';

  return (
    <div className="mt-8 p-6 border rounded-lg bg-white shadow-md max-w-5xl mx-auto">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img src="/logo.png" alt="Logo" className="h-20" />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-center tracking-widest uppercase mb-1">Certificate</h2>
      <p className="text-center text-sm font-medium text-gray-600 mb-8">OF WARRANTY</p>

      {/* Two-column field layout */}
      <div className="grid grid-cols-2 gap-6 text-sm text-gray-800 px-8 mb-10">
        <div>
          <div className="mb-5">
            <p className="text-xs text-gray-500">Customer Name</p>
            <p className="font-semibold text-base">{data.customerName || '—'}</p>
          </div>
          <div className="mb-5">
            <p className="text-xs text-gray-500">Services</p>
            <p className="font-semibold text-base">{productName || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Start Date</p>
            <p className="font-semibold text-base">{data.contractDate || '—'}</p>
          </div>
        </div>

        <div>
          <div className="mb-5">
            <p className="text-xs text-gray-500">Address</p>
            <p className="font-semibold text-base whitespace-pre-wrap">{data.customerAddress || '—'}</p>
          </div>
          <div className="mb-5">
            <p className="text-xs text-gray-500">Serial No.</p>
            <p className="font-semibold text-base">{serialNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">End Date</p>
            <p className="font-semibold text-base">{data.servicePeriod || '—'}</p>
          </div>
        </div>
      </div>

      {/* Description text */}
      <p className="text-center text-sm text-gray-700 max-w-3xl mx-auto leading-relaxed mb-10">
        We hereby guarantee and warranty all pest control services provided for the stated duration.
        The service has been carried out at the customer's premises. <strong>Pest Pro Solutions</strong> will
        reservice or rectify any issues arising from ineffective treatment, at no additional cost to the
        customer, within the warranty period.
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between px-20 mt-10">
        <div className="text-center">
          <p className="text-sm">Date: {data.invoiceDate}</p>
          <div className="w-32 border-t mt-2 mx-auto" />
        </div>
        <div className="w-12 h-12">
          <img src="/gold-medal.png" alt="seal" />
        </div>
        <div className="text-center">
          <p className="text-sm"> Authorized Signature</p>
          <div className="w-32 border-t mt-2 mx-auto" />
            <p className='font-bold'>Pest Pro Solutions</p>

        </div>
      </div>

      {/* Download Button */}
      <div className="mt-10 text-center">
        <PDFDownloadLink
          document={<CertificatePDF data={data} />}
          fileName={`Warranty-Certificate-${data.customerName}.pdf`}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          {({ loading }) => loading ? 'Preparing PDF...' : 'Download Certificate'}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default WarrantyCertificate;
