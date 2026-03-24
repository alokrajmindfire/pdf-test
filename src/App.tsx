import { FileText, Download, Eye } from 'lucide-react';
import { useState } from 'react';
import pdf1 from './assets/Bidder Instructions-6.pdf'
import pdf2 from './assets/Sanilac_1.pdf'
import pdf3 from './assets/Urban Design Plan_24.pdf'
import pdf4 from './assets/pedestrian_90.pdf'
import pdf5 from './assets/5.pdf'
import pdf6 from './assets/BUILDING PERMIT FEE - MAY 2016.pdf'
interface PDFDocument {
  id: number;
  title: string;
  description: string;
  url: string;
  size: string;
}

const documents: PDFDocument[] = [
  {
    id: 1,
    title: 'Project Proposal 1',
    description: 'Detailed project proposal and requirements documentation',
    url: pdf1,
    size: '2.3 MB'
  },
  {
    id: 2,
    title: 'User Manual 2',
    description: 'Complete guide for end users and administrators',
    url: pdf2,
    size: '1.8 MB'
  },
  {
    id: 3,
    title: 'Technical Specifications 3',
    description: 'Technical architecture and system specifications',
    url: pdf3,
    size: '3.1 MB'
  },
  {
    id: 4,
    title: 'Meeting Notes 4',
    description: 'Summary of quarterly planning meetings',
    url: pdf4,
    size: '1.2 MB'
  },
  {
    id: 5,
    title: 'Meeting Notes 5',
    description: 'Summary of quarterly planning meetings',
    url: pdf5,
    size: '1.2 MB'
  },
  {
    id: 6,
    title: 'Meeting Notes 6',
    description: 'Summary of quarterly planning meetings',
    url: pdf6,
    size: '1.2 MB'
  },
];

function App() {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">Document Library</h1>
          <p className="text-slate-600 text-lg">Access and view your PDF documents</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-slate-200"
            >
              <div className="flex items-start mb-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-slate-800 mb-2">{doc.title}</h3>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed">{doc.description}</p>

              <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                <span className="font-medium">{doc.size}</span>
                <span className="px-2 py-1 bg-slate-100 rounded text-xs">PDF</span>
              </div>

              {/* <div className="flex gap-2"> */}
                
                <a
                  href={doc.url}
                  download
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors duration-200 font-medium"
                >
                  View
                </a>
              {/* </div> */}
            </div>
          ))}
        </div>

       {selectedPdf && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-slate-50">
        <h2 className="text-lg font-semibold text-slate-800">PDF Viewer</h2>

        <button
          onClick={() => setSelectedPdf(null)}
          className="px-4 py-2 text-sm bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition"
        >
          Close
        </button>
      </div>

      {/* Viewer */}
      <div className="flex-1 bg-slate-100">
        <iframe
          src={selectedPdf}
          title="PDF Viewer"
          className="w-full h-full border-0"
        />
      </div>

    </div>
  </div>
)}
      </div>
    </div>
  );
}

export default App;
