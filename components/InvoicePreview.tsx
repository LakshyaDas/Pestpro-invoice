'use client';

import { InvoiceData } from '@/types/invoice';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface InvoicePreviewProps {
  data: InvoiceData;
}

export function InvoicePreview({ data }: InvoicePreviewProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 shadow-lg bg-white">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <img src="logo.png" alt="pest-control" width={150}/>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {data.companyName || 'PEST PRO SOLUTIONS'}
            </h1>
            <div className="text-gray-600">
              <p className="font-medium">Address:</p>
              <p className="whitespace-pre-line">
                {data.companyAddress || 'Near Jeevan Jyoti Hospital, Patel Nagar, Chhindwara 480001'}
              </p>
              <p className="font-medium">Phone:</p>

              <p className="whitespace-pre-line">
                {data.companyphone || '7987449147'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="mb-4">
              <p className="font-semibold text-lg">INVOICE NO: {data.invoiceNo || '___'}</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-8">
                <span className="font-medium">INVOICE DATE:</span>
                <span>{data.invoiceDate ? new Date(data.invoiceDate).toLocaleDateString() : '___'}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="font-medium">CONTACT NO:</span>
                <span>{data.contactNo || '___'}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="font-medium">CONTRACT DATE:</span>
                <span>{data.contractDate ? new Date(data.contractDate).toLocaleDateString() : '___'}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="font-medium">SERVICE PERIOD:</span>
                <span>{data.servicePeriod ? new Date(data.servicePeriod).toLocaleDateString() : '___'}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Customer and Payment Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Details</h3>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Name: </span>
                <span>{data.customerName || '___'}</span>
              </div>
              <div>
                <span className="font-medium">Address: </span>
                <span className="whitespace-pre-line">{data.customerAddress || '___'}</span>
              </div>
              <div>
                <span className="font-medium">Mobile No: </span>
                <span>{data.customerMobile || '___'}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
            <div className="space-y-2">
              <p className="font-medium">{data.companyName || 'Pest Pro Solutions'}</p>
              <div>
                <span className="font-medium">Bank Name: </span>
                <span>{data.bankName || 'Kotak Mahindra Bank'}</span>
              </div>
              <div>
                <span className="font-medium">Branch Add: </span>
                <span>{data.branchAddress || 'Sarra Chhindwara 480001'}</span>
              </div>
              <div>
                <span className="font-medium">Account Number: </span>
                <span>{data.accountNumber || '0214166998'}</span>
              </div>
              <div>
                <span className="font-medium">IFSC Code: </span>
                <span>{data.ifscCode || 'KKBK0005914'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Items Table */}
        <div className="mb-8">
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-100 grid grid-cols-4 gap-4 p-4 font-semibold text-gray-900">
              <div>Particular</div>
              <div>Area/Quantity</div>
              <div>Rate</div>
              <div>Amount</div>
            </div>
            {data.items?.map((item, index) => (
              <div key={item.id} className="grid grid-cols-4 gap-4 p-4 border-t border-gray-200">
                <div>{item.particular || '___'}</div>
                <div>{item.areaQuantity || '___'}</div>
                <div>₹{item.rate?.toFixed(2) || '0.00'}</div>
                <div>₹{item.amount?.toFixed(2) || '0.00'}</div>
              </div>
            ))}
            
            {/* Empty rows for spacing */}
            {Array.from({ length: Math.max(0, 3 - (data.items?.length || 0)) }).map((_, index) => (
              <div key={`empty-${index}`} className="grid grid-cols-4 gap-4 p-4 border-t border-gray-200 h-12"></div>
            ))}
          </div>
        </div>

        {/* Total Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="font-medium">In words rate: </span>
              <span>{data.totalInWords || 'Zero Rupees Only'}</span>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">
                <span>Total: ₹{data.total?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Signature Section */}
        <div className="flex justify-between items-end pt-8">
          <div className="text-center">
            <div className="border-t border-gray-400 w-48 mb-2"></div>
            <p className="font-medium">Receiver's Sign</p>
          </div>
          <div className="text-center">
            <div className="mb-8"></div>
            <p className="font-medium">{data.companyName || 'Pest Pro Solutions'}</p>
            <p className="text-sm text-gray-600">Authorized Signature</p>
          </div>
        </div>
      </Card>
    </div>
  );
}