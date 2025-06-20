'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // ✅ correct for App Router
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

import { InvoiceForm } from '@/components/InvoiceForm';
import { InvoicePreview } from '@/components/InvoicePreview';
import { PDFGenerator } from '@/components/PDFGenerator';
import { InvoiceData, createEmptyInvoice } from '@/types/invoice';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { FileText, Edit, Download } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  const [invoiceData, setInvoiceData] = useState<InvoiceData>(createEmptyInvoice());
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Auth check on page load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      } else {
        setIsAuthed(true);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  // ✅ Load invoice from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('invoiceData');
      if (saved) {
        try {
          setInvoiceData(JSON.parse(saved));
        } catch (err) {
          console.error('Failed to parse saved invoice data');
        }
      }
    }
  }, []);

  // ✅ Save to localStorage when invoiceData changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('invoiceData', JSON.stringify(invoiceData));
    }
  }, [invoiceData]);

  const handleLogout = () => signOut(auth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthed) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            PESTPRO SOLUTIONS INVOICE
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create and customize professional invoices with ease. Fill in your details, 
            preview in real-time, and generate PDF documents ready for your clients.
          </p>
          <h4>Developed By: Aetherix Technologies</h4>
        </div>

        <Card className="max-w-7xl mx-auto overflow-hidden shadow-xl border-0">
          <Tabs defaultValue="edit" className="w-full">
            <div className="bg-white border-b">
              <TabsList className="h-16 w-full justify-start rounded-none bg-transparent p-0">
                <TabsTrigger value="edit" className="h-16 px-8 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
                  <Edit className="w-5 h-5 mr-2" />
                  Edit Invoice
                </TabsTrigger>
                <TabsTrigger value="preview" className="h-16 px-8 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
                  <FileText className="w-5 h-5 mr-2" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="pdf" className="h-16 px-8 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
                  <Download className="w-5 h-5 mr-2" />
                  Generate PDF
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="edit" className="mt-0">
              <div className="p-6 bg-gray-50">
                <InvoiceForm data={invoiceData} onChange={setInvoiceData} />
              </div>
            </TabsContent>

            <TabsContent value="preview" className="mt-0">
              <div className="p-6 bg-white">
                <InvoicePreview data={invoiceData} />
              </div>
            </TabsContent>

            <TabsContent value="pdf" className="mt-0">
              <div className="p-6 bg-gray-50">
                <PDFGenerator data={invoiceData} />
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
