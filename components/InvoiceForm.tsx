'use client';

import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { InvoiceData, InvoiceItem, createEmptyItem } from '@/types/invoice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Building, User, CreditCard, Receipt } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface InvoiceFormProps {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

export function InvoiceForm({ data, onChange }: InvoiceFormProps) {
  const { register, watch, setValue, getValues } = useForm<InvoiceData>({
    defaultValues: data
  });

  const watchedData = watch();

  useEffect(() => {
    // Update parent component when form data changes
    const subscription = watch((value) => {
      if (value) {
        const calculatedData = calculateTotals(value as InvoiceData);
        onChange(calculatedData);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  const calculateTotals = (formData: InvoiceData): InvoiceData => {
  const items = formData.items?.map(item => ({
    ...item,
    amount: (item.rate || 0) * parseFloat(item.areaQuantity || '1') // ✅ This is correct
  })) || [];

    const subtotal = items.reduce((sum, item) => sum + (item.amount || 0), 0);
    const total = subtotal;
    const totalInWords = numberToWords(total);

    return {
      ...formData,
      items,
      subtotal,
      total,
      totalInWords
    };
  };

  const addItem = () => {
    const currentItems = getValues('items') || [];
    const newItems = [...currentItems, createEmptyItem()];
    setValue('items', newItems);
  };

  const removeItem = (index: number) => {
    const currentItems = getValues('items') || [];
    if (currentItems.length > 1) {
      const newItems = currentItems.filter((_, i) => i !== index);
      setValue('items', newItems);
    }
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const currentItems = getValues('items') || [];
    const newItems = [...currentItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setValue('items', newItems);
  };

  return (
    <div className="space-y-6">
      {/* Company Information */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                {...register('companyName')}
                className="font-semibold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactNo">Contact Number</Label>
              <Input
                id="contactNo"
                {...register('contactNo')}
                placeholder="Phone number"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyAddress">Company Address</Label>
            <Textarea
              id="companyAddress"
              {...register('companyAddress')}
              className="min-h-[60px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Invoice Details */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Invoice Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceNo">Invoice Number</Label>
              <Input
                id="invoiceNo"
                {...register('invoiceNo')}
                placeholder="INV-001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoiceDate">Invoice Date</Label>
              <Input
                id="invoiceDate"
                type="date"
                {...register('invoiceDate')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contractDate">Contract Date</Label>
              <Input
                id="contractDate"
                type="date"
                {...register('contractDate')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contractDate">Service Period</Label>
              <Input
                id="servicePeriod"
                type="date"
                {...register('servicePeriod')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Information */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Customer Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                {...register('customerName')}
                placeholder="Enter customer name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerMobile">Mobile Number</Label>
              <Input
                id="customerMobile"
                {...register('customerMobile')}
                placeholder="Mobile number"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerAddress">Customer Address</Label>
            <Textarea
              id="customerAddress"
              {...register('customerAddress')}
              className="min-h-[60px]"
              placeholder="Enter customer address"
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Details */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-600 to-orange-700 text-white">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                {...register('bankName')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="branchAddress">Branch Address</Label>
              <Input
                id="branchAddress"
                {...register('branchAddress')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                {...register('accountNumber')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ifscCode">IFSC Code</Label>
              <Input
                id="ifscCode"
                {...register('ifscCode')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Items */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Invoice Items
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {watchedData.items?.map((item, index) => (
              <div key={item.id} className="p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Particular</Label>
                    <Input
                      value={item.particular}
                      onChange={(e) => updateItem(index, 'particular', e.target.value)}
                      placeholder="Service description"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Area/Quantity</Label>
                    <Input
                      value={item.areaQuantity}
                      onChange={(e) => updateItem(index, 'areaQuantity', e.target.value)}
                      placeholder="1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Rate (₹)</Label>
                    <Input
                      type="number"
                      value={item.rate}
                      onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Amount (₹)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        value={item.amount?.toFixed(2) || '0.00'}
                        readOnly
                        className="bg-gray-100"
                      />
                      {watchedData.items && watchedData.items.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeItem(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Button
              type="button"
              onClick={addItem}
              variant="outline"
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>

          <Separator className="my-6" />

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total Amount:</span>
              <span className="text-blue-700">₹{watchedData.total?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              <strong>In Words:</strong> {watchedData.totalInWords || 'Zero Rupees Only'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function numberToWords(num: number): string {
  if (num === 0) return 'Zero Rupees Only';
  
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  function convertHundreds(n: number): string {
    let result = '';
    
    if (n >= 100) {
      result += ones[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    
    if (n >= 20) {
      result += tens[Math.floor(n / 10)] + ' ';
      n %= 10;
    } else if (n >= 10) {
      result += teens[n - 10] + ' ';
      return result;
    }
    
    if (n > 0) {
      result += ones[n] + ' ';
    }
    
    return result;
  }
  
  let integerPart = Math.floor(num);
  const decimalPart = Math.round((num - integerPart) * 100);
  
  let result = '';
  
  if (integerPart >= 10000000) {
    result += convertHundreds(Math.floor(integerPart / 10000000)) + 'Crore ';
    integerPart %= 10000000;
  }
  
  if (integerPart >= 100000) {
    result += convertHundreds(Math.floor(integerPart / 100000)) + 'Lakh ';
    integerPart %= 100000;
  }
  
  if (integerPart >= 1000) {
    result += convertHundreds(Math.floor(integerPart / 1000)) + 'Thousand ';
    integerPart %= 1000;
  }
  
  if (integerPart > 0) {
    result += convertHundreds(integerPart);
  }
  
  result += 'Rupees';
  
  if (decimalPart > 0) {
    result += ' and ' + convertHundreds(decimalPart) + 'Paise';
  }
  
  return result.trim() + ' Only';
}