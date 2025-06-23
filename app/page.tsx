'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import toast, { Toaster } from 'react-hot-toast';

import { InvoiceForm } from '@/components/InvoiceForm';
import { InvoicePreview } from '@/components/InvoicePreview';
import { PDFGenerator } from '@/components/PDFGenerator';
import WarrantyCertificate from '@/components/WarrantyCertificate';
import { InvoiceData, createEmptyInvoice } from '@/types/invoice';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { FileText, Edit, Download, Award } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(createEmptyInvoice());
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login');
        return;
      }

      try {
        const docRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(docRef);

        if (!userDoc.exists()) {
          toast.error('No user record found');
          await signOut(auth);
          router.push('/login');
          return;
        }

        const role = userDoc.data()?.role;

        if (role !== 'admin') {
          toast.error('Access denied. Admins only.');
          await signOut(auth);
          router.push('/login');
          return;
        }

        setIsAuthed(true);
      } catch (err) {
        console.error('🔥 Firestore role check error:', err);
        toast.error('Failed to verify role.');
        await signOut(auth);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  // 🔁 Auto logout after 1 hour (3600000 ms)
  useEffect(() => {
    if (!isAuthed) return;

    const logoutTimer = setTimeout(() => {
      signOut(auth);
      toast('Session expired. Please log in again.');
      router.push('/login');
    }, 60 * 60 * 1000); // 1 hour

    return () => clearTimeout(logoutTimer);
  }, [isAuthed]);

  useEffect(() => {
    const saved = localStorage.getItem('invoiceData');
    if (saved) {
      try {
        setInvoiceData(JSON.parse(saved));
      } catch {
        console.error('Failed to parse saved invoice data');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('invoiceData', JSON.stringify(invoiceData));
  }, [invoiceData]);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success('Logged out successfully');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Toaster />
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthed) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Toaster />

      <div className="container mx-auto px-4 py-8 relative">
        {/* 🔓 Logout Button */}
        <div className="absolute top-6 right-6">
          <button
            onClick={handleLogout}
            className=" hover:bg-red-600 text-black px-4 py-2 rounded shadow"
          >
            Logout
          </button>
        </div>

        {/* ✅ Company Logo */}
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="PestPro Logo" className="h-20" />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">PESTPRO SOLUTIONS INVOICE</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create, preview, and download professional invoices & warranty certificates.
          </p>
          <p className="text-sm text-gray-500 mt-2">Developed by Aetherix Technologies</p>
        </div>

        <Card className="w-full max-w-7xl mx-auto overflow-hidden shadow-xl border-0">
          <Tabs defaultValue="edit" className="w-full">
            <div className="bg-white border-b">
              <TabsList className="flex flex-wrap w-full justify-start rounded-none bg-transparent p-0">
                <TabsTrigger value="edit" className="tab-trigger"><Edit className="w-5 h-5 mr-2" />Edit Invoice</TabsTrigger>
                <TabsTrigger value="preview" className="tab-trigger"><FileText className="w-5 h-5 mr-2" />Invoice Preview</TabsTrigger>
                <TabsTrigger value="pdf" className="tab-trigger"><Download className="w-5 h-5 mr-2" />Invoice PDF</TabsTrigger>
                <TabsTrigger value="warranty" className="tab-trigger"><Award className="w-5 h-5 mr-2" />Warranty Certificate</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="edit"><InvoiceForm data={invoiceData} onChange={setInvoiceData} /></TabsContent>
            <TabsContent value="preview"><InvoicePreview data={invoiceData} /></TabsContent>
            <TabsContent value="pdf"><PDFGenerator data={invoiceData} /></TabsContent>
            <TabsContent value="warranty"><WarrantyCertificate data={invoiceData} /></TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
