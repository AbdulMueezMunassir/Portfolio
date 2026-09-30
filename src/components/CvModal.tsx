import React, { useState, useEffect } from 'react';
import {
  X,
  Printer,
  Copy,
  CheckCircle2,
  Download,
  Loader2,
  AlertCircle,
  ExternalLink,
  Github,
} from 'lucide-react';
import jsPDF from 'jspdf';
import { PERSONAL_INFO, REFERENCES } from '../data';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatarUrl?: string;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);
  const [printNotice, setPrintNotice] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('cv-modal-open');
    } else {
      document.body.classList.remove('cv-modal-open');
      setPrintNotice(null);
      setPdfSuccess(false);
    }
    return () => {
      document.body.classList.remove('cv-modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Fallback direct HTML resume file download
  const triggerHtmlResumeDownload = () => {
    const element = document.getElementById('cv-printable-document');
    if (!element) return;
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Abdul Mueez - Curriculum Vitae</title>
  <style>
    @page { size: A4 portrait; margin: 14mm 16mm; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 24px;
      font-size: 10.5pt;
      line-height: 1.42;
    }
    h1 { color: #1e3a8a; font-size: 22pt; margin: 0 0 2px 0; font-weight: 800; }
    h2 {
      color: #1e3a8a;
      font-size: 11pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      border-bottom: 1.5px solid #cbd5e1;
      padding-bottom: 3px;
      margin: 14px 0 6px 0;
    }
    p { margin: 0 0 4px 0; }
    ul { margin: 3px 0 6px 18px; padding: 0; }
    li { margin-bottom: 3px; font-size: 9.5pt; color: #1e293b; }
    .tech-stack { font-style: italic; font-size: 9pt; color: #475569; margin-top: 2px; }
    a { color: #1e3a8a; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .cv-document { max-width: 800px; margin: 0 auto; }
  </style>
</head>
<body>
  ${element.innerHTML}
</body>
</html>`;
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Abdul_Mueez_CV.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  // Generate selectable PDF text directly so download does not depend on CSS canvas rendering.
  const handleDownloadPdf = async () => {
    const element = document.getElementById('cv-printable-document');
    if (!element || isDownloadingPdf) return;

    setIsDownloadingPdf(true);
    setPrintNotice(null);

    try {
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - margin * 2;
      let cursorY = margin;
      let isFirstLine = true;

      for (const rawLine of element.innerText.replace(/\r/g, '').split('\n')) {
        const line = rawLine.trim().replace(/\u2022/g, '-');
        if (!line) {
          cursorY += 2;
          continue;
        }

        const isName = isFirstLine;
        const isSection = !isName && line.length < 56 && /^[A-Z0-9][A-Z0-9 &/(),.'-]*$/.test(line);
        const isRole = line.startsWith('Junior Software Engineer');
        const fontSize = isName ? 20 : isSection ? 10 : isRole ? 11 : 9;
        const lineHeight = isName ? 9 : isSection ? 6.5 : 4.5;
        const wrappedLines = pdf.splitTextToSize(line, contentWidth);

        if (cursorY + wrappedLines.length * lineHeight > pageHeight - margin - 8) {
          pdf.addPage();
          cursorY = margin;
        }

        pdf.setFont('helvetica', isName || isSection || isRole ? 'bold' : 'normal');
        pdf.setFontSize(fontSize);
        pdf.setTextColor(isName || isSection ? 30 : 30, isName || isSection ? 58 : 41, isName || isSection ? 138 : 59);
        pdf.text(wrappedLines, margin, cursorY);
        cursorY += wrappedLines.length * lineHeight;

        if (isSection) {
          pdf.setDrawColor(203, 213, 225);
          pdf.line(margin, cursorY - 1, pageWidth - margin, cursorY - 1);
          cursorY += 1;
        }
        isFirstLine = false;
      }

      const pageCount = pdf.getNumberOfPages();
      for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
        pdf.setPage(pageNumber);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8);
        pdf.setTextColor(100, 116, 139);
        pdf.text(`Abdul Mueez | CV | ${pageNumber}/${pageCount}`, margin, pageHeight - 7);
      }

      pdf.save('Abdul_Mueez_CV.pdf');
      setPdfSuccess(true);
      setTimeout(() => setPdfSuccess(false), 3500);
    } catch (error) {
      console.error('PDF generation error, falling back to HTML resume download:', error);
      triggerHtmlResumeDownload();
      setPrintNotice('PDF generation failed. An HTML version of your CV was downloaded instead.');
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch {
      setPrintNotice('Printing is unavailable. Download the PDF instead.');
      handleDownloadPdf();
    }
  };

  const handleCopyText = () => {
    const textCV = `
ABDUL MUEEZ
Junior Software Engineer | Full-Stack Developer
Colombo, Sri Lanka | +94 76 172 2165 | abmueez593@gmail.com | LinkedIn: https://www.linkedin.com/in/abdul-mueez-527ba7222/ | GitHub: https://github.com/AbdulMueezMunassir

PROFESSIONAL SUMMARY
Final-year Computer Science undergraduate (BSc Hons, Sabaragamuwa University of Sri Lanka) with hands-on full-stack development experience from an internship at Hameedia and independent projects across the MERN/MENN stacks, Angular, and applied machine learning. Comfortable owning a feature end-to-end – from database schema and REST APIs to responsive, real-time frontends – using PHP, MySQL, Node.js, Express, MongoDB, React and Angular. Recently extended this into data-driven applications with Python and Scikit-learn, and cloud/DevOps tooling with AWS and Docker. Looking for a junior software engineering role to keep building practical, scalable products.

TECHNICAL SKILLS
Languages: TypeScript, JavaScript, Python, Java, PHP, C, C#
Frontend: Angular, React.js, Next.js, HTML5, CSS3, Tailwind CSS
Backend: Node.js, Express.js, Django, Laravel, REST APIs, JWT, Socket.io
Database: MySQL, PostgreSQL, MongoDB
Cloud & DevOps: AWS, Docker
ML / Data: Python, Pandas, NumPy, Scikit-learn, Streamlit
AI Tools: Claude, ChatGPT, Gemini, DeepSeek
Tools & Concepts: Git, GitHub, VS Code, Cursor, Jupyter Notebook, OOP, Data Structures & Algorithms, Agile

EXPERIENCE
Full-Stack Developer Intern – Hameedia (Private) Limited | April 2026
- Developed a PHP & MySQL Order Management System connecting the Head Office and branches to streamline order creation, tracking, and fulfillment across retail operations.
- Designed relational database schemas and RESTful endpoints in PHP to support real-time order status updates across multiple branch locations.
- Built an Hourly Production Reporting System using PHP & MySQL to record production output and give management real-time visibility into hourly production performance.
- Created dashboard views and automated reports so supervisors could track production targets against actual output.
- Developed a MERN Stack Project Progress Monitoring System to track and visualize project milestones, tasks, progress status, and overall project performance.
- Implemented RESTful APIs with Node.js and Express.js, and built dynamic React components to visualize project data in real time.
Technologies: React, Node.js, Express.js, MongoDB, PHP, MySQL, JavaScript, HTML, CSS

PROJECTS
Pharmacy POS & Inventory System – MERN Stack
- Built billing, stock-management and reporting workflows with dashboard metrics, stock-value tracking and expiry alerts.
- Added intelligent product search and authentication-based access control.
- Designed a normalized MongoDB schema and RESTful APIs with Node.js and Express.js to support real-time stock updates.
Technologies: React, Node.js, Express.js, MongoDB, JWT

Aqua Market – Premium Aquarium Marketplace – Next.js
- Developed a responsive e-commerce platform for aquarium products with product browsing, categories, shopping cart, wishlist, and order management.
- Implemented role-based access for Admin, Staff, and Customers, with an analytics dashboard for managing products and orders.
- Integrated JWT authentication, Zustand state management, and Socket.io for secure access, client-side state, and real-time updates.
Technologies: Next.js, TypeScript, MongoDB, Mongoose, JWT, Tailwind CSS, Zustand, Socket.io, Stripe

MHK Travels – Hajj & Umrah Tour Management Platform – PENN Stack
- Developed a full-stack pilgrimage booking platform for managing Hajj & Umrah packages, customer bookings, and tour information.
- Integrated PayHere payment gateway with advance payment support, enabling customers to securely make online bookings.
- Implemented an admin management system for managing packages, bookings, customers, and payment records.
Technologies: Next.js, React, Node.js, Express.js, PostgreSQL, Tailwind CSS, PayHere

House Price Prediction – Machine Learning
- Trained a regression model on Sri Lankan property and location data, then wrapped it in an interactive Streamlit app for live predictions and data insights.
- Performed data cleaning, feature engineering, and exploratory analysis using Pandas and NumPy to improve model accuracy.
- Evaluated multiple regression algorithms with Scikit-learn and tuned hyperparameters to select the best-performing model.
Technologies: Python, Pandas, NumPy, Scikit-learn, Streamlit

EDUCATION
BSc (Hons) in Computer Science and Technology | 2022 – 2026
Sabaragamuwa University of Sri Lanka

G.C.E. Advanced Level – Physical Science Stream | 2020
Combined Maths: B, Chemistry: C, Physics: S

REFERENCES
Prof. (Dr.) R.M. Kapila Tharanga Rathnayaka
Dean, Faculty of Applied Sciences, Sabaragamuwa University of Sri Lanka.
B.Sc. Special (Math. & Stat.) (Ruhuna), M.Sc. (Industrial Mathematics) (USJ), M.Sc. (Statistics) (WHUT, China), Ph.D. (Applied Statistics) (WHUT, China)
Mobile: +94 71 632 4516 | Email: kapilar@appsc.sab.ac.lk, kapila.tr@gmail.com
`.trim();

    navigator.clipboard.writeText(textCV);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="cv-modal-wrapper fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity no-print"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="cv-modal-container relative w-full max-w-4xl bg-slate-900 border border-white/15 rounded-3xl p-5 sm:p-8 shadow-2xl z-10 my-6 max-h-[92vh] overflow-y-auto text-slate-100 print:max-w-none print:m-0 print:p-0 print:border-none print:shadow-none print:bg-white print:text-black">
        
        {/* Floating Actions Toolbar (hidden in print) */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-white/10 sticky -top-5 sm:-top-8 bg-slate-900/95 backdrop-blur-md pt-2 z-20">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span className="text-sm font-bold text-white tracking-wide">
              Abdul Mueez — Curriculum Vitae (PDF Version)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloadingPdf}
              id="cv-modal-download-pdf-btn"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
              title="Download CV as a high-resolution A4 PDF document"
            >
              {isDownloadingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : pdfSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              id="cv-modal-print-btn"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-xs font-medium text-slate-200 hover:text-cyan-300 transition-colors cursor-pointer"
              title="Open browser print dialog"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={handleCopyText}
              id="cv-modal-copy-btn"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close CV preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feedback Notices */}
        {pdfSuccess && (
          <div className="no-print mb-4 p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-xs text-emerald-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Success:</strong> Abdul_Mueez_CV.pdf has been generated and saved to your device!
              </span>
            </div>
          </div>
        )}

        {printNotice && (
          <div className="no-print mb-4 p-3 rounded-xl bg-amber-950/70 border border-amber-500/40 text-xs text-amber-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{printNotice}</span>
            </div>
            <button
              onClick={() => setPrintNotice(null)}
              className="text-amber-400 hover:text-white text-xs ml-2 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Printable ATS Document Layout (Matches exact PDF layout) */}
        <div
          id="cv-printable-document"
          className="cv-document bg-white text-slate-900 p-6 sm:p-10 rounded-2xl shadow-inner font-sans selection:bg-cyan-200 selection:text-slate-900 print:p-0 print:shadow-none"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
        >
          
          {/* Header */}
          <div className="pb-3 mb-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a8a] tracking-tight">
              ABDUL MUEEZ
            </h1>
            <p className="text-sm font-semibold text-slate-800 mt-0.5">
              Junior Software Engineer | Full-Stack Developer
            </p>
            <p className="text-xs text-slate-700 mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>Colombo, Sri Lanka</span>
              <span className="text-slate-400">|</span>
              <a href={`tel:${PERSONAL_INFO.phone}`} className="hover:underline text-slate-800">
                {PERSONAL_INFO.phone}
              </a>
              <span className="text-slate-400">|</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:underline text-slate-800">
                {PERSONAL_INFO.email}
              </a>
              <span className="text-slate-400">|</span>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:underline text-[#1e3a8a] font-medium">
                LinkedIn
              </a>
              <span className="text-slate-400">|</span>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:underline text-[#1e3a8a] font-medium">
                GitHub
              </a>
            </p>
          </div>

          {/* Section: Professional Summary */}
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1e3a8a] border-b border-slate-300 pb-0.5 mb-1.5">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs text-slate-800 leading-relaxed text-justify">
              Final-year Computer Science undergraduate (BSc Hons, Sabaragamuwa University of Sri Lanka) with hands-on full-stack 
              development experience from an internship at Hameedia and independent projects across the MERN/MENN stacks, 
              Angular, and applied machine learning. Comfortable owning a feature end-to-end – from database schema and REST 
              APIs to responsive, real-time frontends – using PHP, MySQL, Node.js, Express, MongoDB, React and Angular. Recently 
              extended this into data-driven applications with Python and Scikit-learn, and cloud/DevOps tooling with AWS and 
              Docker. Looking for a junior software engineering role to keep building practical, scalable products.
            </p>
          </div>

          {/* Section: Technical Skills */}
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1e3a8a] border-b border-slate-300 pb-0.5 mb-1.5">
              TECHNICAL SKILLS
            </h2>
            <div className="space-y-1 text-xs text-slate-800">
              <p><strong className="text-slate-950 font-semibold">Languages:</strong> TypeScript, JavaScript, Python, Java, PHP, C, C#</p>
              <p><strong className="text-slate-950 font-semibold">Frontend:</strong> Angular, React.js, Next.js, HTML5, CSS3, Tailwind CSS</p>
              <p><strong className="text-slate-950 font-semibold">Backend:</strong> Node.js, Express.js, Django, Laravel, REST APIs, JWT, Socket.io</p>
              <p><strong className="text-slate-950 font-semibold">Database:</strong> MySQL, PostgreSQL, MongoDB</p>
              <p><strong className="text-slate-950 font-semibold">Cloud & DevOps:</strong> AWS, Docker</p>
              <p><strong className="text-slate-950 font-semibold">ML / Data:</strong> Python, Pandas, NumPy, Scikit-learn, Streamlit</p>
              <p><strong className="text-slate-950 font-semibold">AI Tools:</strong> Claude, ChatGPT, Gemini, DeepSeek</p>
              <p><strong className="text-slate-950 font-semibold">Tools & Concepts:</strong> Git, GitHub, VS Code, Cursor, Jupyter Notebook, OOP, Data Structures & Algorithms, Agile</p>
            </div>
          </div>

          {/* Section: Experience */}
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1e3a8a] border-b border-slate-300 pb-0.5 mb-1.5">
              EXPERIENCE
            </h2>
            <div className="text-xs">
              <div className="flex justify-between items-baseline font-bold text-slate-950">
                <span>Full-Stack Developer Intern – Hameedia (Private) Limited</span>
                <span className="font-semibold text-slate-700">April 2026</span>
              </div>
              <ul className="mt-1 list-disc list-outside pl-4 space-y-1 text-slate-800">
                <li>
                  Developed a PHP & MySQL Order Management System connecting the Head Office and branches to streamline order creation, tracking, and fulfillment across retail operations.
                </li>
                <li>
                  Designed relational database schemas and RESTful endpoints in PHP to support real-time order status updates across multiple branch locations.
                </li>
                <li>
                  Built an Hourly Production Reporting System using PHP & MySQL to record production output and give management real-time visibility into hourly production performance.
                </li>
                <li>
                  Created dashboard views and automated reports so supervisors could track production targets against actual output.
                </li>
                <li>
                  Developed a MERN Stack Project Progress Monitoring System to track and visualize project milestones, tasks, progress status, and overall project performance.
                </li>
                <li>
                  Implemented RESTful APIs with Node.js and Express.js, and built dynamic React components to visualize project data in real time.
                </li>
              </ul>
              <p className="text-[11px] text-slate-600 italic mt-1">
                Technologies: React, Node.js, Express.js, MongoDB, PHP, MySQL, JavaScript, HTML, CSS
              </p>
            </div>
          </div>

          {/* Section: Projects */}
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1e3a8a] border-b border-slate-300 pb-0.5 mb-1.5">
              PROJECTS
            </h2>
            
            <div className="space-y-3 text-xs">
              {/* Project 1 */}
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-bold text-slate-950">
                    Pharmacy POS & Inventory System – MERN Stack
                  </span>
                  <a
                    href="https://github.com/AbdulMueezMunassir/No1-Pharmacy-POS-System"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-[#1e3a8a] transition-colors shrink-0"
                    title="View Source Repository"
                  >
                    <Github className="w-3 h-3" />
                    <span>GitHub</span>
                  </a>
                </div>
                <ul className="list-disc list-outside pl-4 text-slate-800 space-y-0.5 mt-0.5">
                  <li>Built billing, stock-management and reporting workflows with dashboard metrics, stock-value tracking and expiry alerts.</li>
                  <li>Added intelligent product search and authentication-based access control.</li>
                  <li>Designed a normalized MongoDB schema and RESTful APIs with Node.js and Express.js to support real-time stock updates.</li>
                </ul>
                <p className="text-[11px] text-slate-600 italic mt-0.5">
                  Technologies: React, Node.js, Express.js, MongoDB, JWT
                </p>
              </div>

              {/* Project 2 */}
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-bold text-slate-950">
                    Aqua Market – Premium Aquarium Marketplace – Next.js
                  </span>
                  <a
                    href="https://github.com/AbdulMueezMunassir/aqua_market"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-[#1e3a8a] transition-colors shrink-0"
                    title="View Source Repository"
                  >
                    <Github className="w-3 h-3" />
                    <span>GitHub</span>
                  </a>
                </div>
                <ul className="list-disc list-outside pl-4 text-slate-800 space-y-0.5 mt-0.5">
                  <li>Developed a responsive e-commerce platform for aquarium products with product browsing, categories, shopping cart, wishlist, and order management.</li>
                  <li>Implemented role-based access for Admin, Staff, and Customers, with an analytics dashboard for managing products and orders.</li>
                  <li>Integrated JWT authentication, Zustand state management, and Socket.io for secure access, client-side state, and real-time updates.</li>
                </ul>
                <p className="text-[11px] text-slate-600 italic mt-0.5">
                  Technologies: Next.js, TypeScript, MongoDB, Mongoose, JWT, Tailwind CSS, Zustand, Socket.io, Stripe
                </p>
              </div>

              {/* Project 3 */}
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-bold text-slate-950">
                    MHK Travels – Hajj & Umrah Tour Management Platform – PENN Stack
                  </span>
                  <a
                    href="https://github.com/AbdulMueezMunassir/Hajj-Umrah-Tour-Operator-Platform-PENN-Stack-"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-[#1e3a8a] transition-colors shrink-0"
                    title="View Source Repository"
                  >
                    <Github className="w-3 h-3" />
                    <span>GitHub</span>
                  </a>
                </div>
                <ul className="list-disc list-outside pl-4 text-slate-800 space-y-0.5 mt-0.5">
                  <li>Developed a full-stack pilgrimage booking platform for managing Hajj & Umrah packages, customer bookings, and tour information.</li>
                  <li>Integrated PayHere payment gateway with advance payment support, enabling customers to securely make online bookings.</li>
                  <li>Implemented an admin management system for managing packages, bookings, customers, and payment records.</li>
                </ul>
                <p className="text-[11px] text-slate-600 italic mt-0.5">
                  Technologies: Next.js, React, Node.js, Express.js, PostgreSQL, Tailwind CSS, PayHere
                </p>
              </div>

              {/* Project 4 */}
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-bold text-slate-950">
                    House Price Prediction – Machine Learning
                  </span>
                  <a
                    href="https://github.com/AbdulMueezMunassir/Sri-Lanka-House-Price-Predictor"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-[#1e3a8a] transition-colors shrink-0"
                    title="View Source Repository"
                  >
                    <Github className="w-3 h-3" />
                    <span>GitHub</span>
                  </a>
                </div>
                <ul className="list-disc list-outside pl-4 text-slate-800 space-y-0.5 mt-0.5">
                  <li>Trained a regression model on Sri Lankan property and location data, then wrapped it in an interactive Streamlit app for live predictions and data insights.</li>
                  <li>Performed data cleaning, feature engineering, and exploratory analysis using Pandas and NumPy to improve model accuracy.</li>
                  <li>Evaluated multiple regression algorithms with Scikit-learn and tuned hyperparameters to select the best-performing model.</li>
                </ul>
                <p className="text-[11px] text-slate-600 italic mt-0.5">
                  Technologies: Python, Pandas, NumPy, Scikit-learn, Streamlit
                </p>
              </div>

              {/* Project 5 */}
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-bold text-slate-950">
                    FoodDelivery LK – Sri Lankan Food Delivery – Next.js
                  </span>
                  <a
                    href="https://github.com/AbdulMueezMunassir/FoodDelivery-LK"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-[#1e3a8a] transition-colors shrink-0"
                    title="View Source Repository"
                  >
                    <Github className="w-3 h-3" />
                    <span>GitHub</span>
                  </a>
                </div>
                <ul className="list-disc list-outside pl-4 text-slate-800 space-y-0.5 mt-0.5">
                  <li>Built a Sri Lankan food-delivery app with restaurant discovery, cuisine browsing, and delivery-address search.</li>
                  <li>Implemented customer and restaurant accounts with signed JWT authentication and protected routes.</li>
                  <li>Modeled users, restaurants, and orders in PostgreSQL with Prisma.</li>
                </ul>
                <p className="text-[11px] text-slate-600 italic mt-0.5">
                  Technologies: Next.js 14, TypeScript, PostgreSQL, Prisma, JWT, bcryptjs, Tailwind CSS
                </p>
              </div>

              {/* Project 6 */}
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-bold text-slate-950">
                    Task Tracker – Kanban Task Management – Next.js
                  </span>
                  <a
                    href="https://github.com/AbdulMueezMunassir/task-tracker"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-[#1e3a8a] transition-colors shrink-0"
                    title="View Source Repository"
                  >
                    <Github className="w-3 h-3" />
                    <span>GitHub</span>
                  </a>
                </div>
                <ul className="list-disc list-outside pl-4 text-slate-800 space-y-0.5 mt-0.5">
                  <li>Built a responsive task manager with a three-column Kanban board, task CRUD, priority levels, and due dates.</li>
                  <li>Added Supabase authentication, protected routes, dashboard analytics, and overdue-task detection.</li>
                  <li>Designed a user-linked Prisma schema backed by PostgreSQL and added Sentry error monitoring.</li>
                </ul>
                <p className="text-[11px] text-slate-600 italic mt-0.5">
                  Technologies: Next.js 16, TypeScript, Tailwind CSS v4, Supabase, PostgreSQL, Prisma 5, Zod, Sentry
                </p>
                <a
                  href="https://task-tracker-tau-ruby.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-[#1e3a8a] transition-colors mt-0.5"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          </div>

          {/* Section: Education */}
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1e3a8a] border-b border-slate-300 pb-0.5 mb-1.5">
              EDUCATION
            </h2>
            <div className="space-y-1.5 text-xs text-slate-800">
              <div>
                <div className="flex justify-between items-baseline font-bold text-slate-950">
                  <span>BSc (Hons) in Computer Science and Technology</span>
                  <span className="font-semibold text-slate-700">2022 – 2026</span>
                </div>
                <p className="text-slate-700">Sabaragamuwa University of Sri Lanka</p>
              </div>
              <div className="pt-0.5">
                <div className="flex justify-between items-baseline font-bold text-slate-950">
                  <span>G.C.E. Advanced Level – Physical Science Stream</span>
                  <span className="font-semibold text-slate-700">2020</span>
                </div>
                <p className="text-slate-700">
                  Combined Maths: B, Chemistry: C, Physics: S
                </p>
              </div>
            </div>
          </div>

          {/* Section: References */}
          <div className="mb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1e3a8a] border-b border-slate-300 pb-0.5 mb-1.5">
              REFERENCES
            </h2>
            <div className="text-xs text-slate-800">
              <p className="font-bold text-slate-950">{REFERENCES[0].name}</p>
              <p className="text-slate-700">{REFERENCES[0].title}, {REFERENCES[0].institution}.</p>
              <p className="text-slate-600 text-[11px] leading-snug mt-0.5">{REFERENCES[0].qualifications}</p>
              <p className="text-[11px] text-slate-700 mt-1">
                <span>Mobile: </span>
                <a href={`tel:${REFERENCES[0].phone}`} className="hover:underline text-slate-900 font-medium">
                  {REFERENCES[0].phone}
                </a>
                <span className="mx-1.5 text-slate-400">|</span>
                <span>Email: </span>
                <a href={`mailto:${REFERENCES[0].emails[0]}`} className="hover:underline text-[#1e3a8a]">
                  {REFERENCES[0].emails[0]}
                </a>
                <span>, </span>
                <a href={`mailto:${REFERENCES[0].emails[1]}`} className="hover:underline text-[#1e3a8a]">
                  {REFERENCES[0].emails[1]}
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="no-print mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleDownloadPdf}
            disabled={isDownloadingPdf}
            id="cv-modal-download-pdf-footer-btn"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/25 transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
            title="Download CV as a high-resolution A4 PDF document"
          >
            {isDownloadingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating A4 PDF...</span>
              </>
            ) : pdfSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>PDF Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </>
            )}
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-xs font-medium text-slate-200 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Print Document</span>
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
