import fs from 'node:fs';
import path from 'node:path';
import PDFDocument from 'pdfkit';
import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  Header,
  HeadingLevel,
  LevelFormat,
  Packer,
  PageNumber,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx';

const ROOT = 'sample-data/contoso-indonesia';
const DIRS = {
  source: path.join(ROOT, 'source'),
  pdf: path.join(ROOT, 'pdf'),
  docx: path.join(ROOT, 'docx'),
  diagrams: path.join(ROOT, 'diagrams'),
  assets: path.join(ROOT, 'assets'),
};

for (const dir of Object.values(DIRS)) fs.mkdirSync(dir, { recursive: true });

const HEADER_IMAGE = path.join(DIRS.assets, 'document-header.png');
const FOOTER_IMAGE = path.join(DIRS.assets, 'document-footer.png');
const border = { style: BorderStyle.SINGLE, size: 1, color: 'D0D7DE' };
const cellBorders = { top: border, bottom: border, left: border, right: border };

const documents = [
  {
    code: 'HR-001',
    filename: 'HR-001-kebijakan-cuti-2026',
    title: 'Kebijakan Cuti Karyawan 2026',
    owner: 'People Operations',
    effective: '1 Januari 2026',
    classification: 'Internal',
    intro:
      'Dokumen ini menjelaskan hak cuti, aturan pengajuan, dan pengecualian untuk karyawan Contoso Indonesia.',
    sections: [
      {
        heading: 'Prinsip Umum',
        body:
          'Semua cuti harus diajukan melalui HR Portal. Manager wajib memberikan keputusan maksimal dua hari kerja setelah permintaan diterima, kecuali cuti sakit yang dilaporkan setelah kejadian.',
      },
      {
        heading: 'Proses Pengajuan Cuti End-to-End',
        body:
          'Alur pengajuan cuti berjalan end-to-end sebagai berikut:\n1. Karyawan mengajukan cuti melalui HR Portal dengan memilih jenis cuti serta tanggal mulai dan tanggal selesai.\n2. Manager melakukan review dan memberikan keputusan (setuju atau tolak) maksimal dua hari kerja setelah permintaan diterima.\n3. Setelah disetujui, HR memperbarui saldo cuti dan status pengajuan pada sistem.\n4. Sistem mengirim notifikasi hasil pengajuan ke karyawan.\nPengecualian: cuti sakit dapat dilaporkan pada hari H setelah kejadian, dan cuti sakit lebih dari satu hari memerlukan surat dokter.',
      },
      {
        heading: 'Dokumen Pendukung',
        body:
          'Cuti sakit lebih dari satu hari memerlukan surat dokter. Cuti khusus memerlukan dokumen pendukung sesuai kategori, seperti undangan resmi, akta, atau surat keterangan dari instansi terkait.',
      },
    ],
    tableTitle: 'Tabel Hak Cuti dan Aturan Pengajuan',
    columns: ['Kategori', 'Eligibility', 'Kuota', 'Minimal Pengajuan', 'Dokumen', 'Catatan'],
    widths: [85, 90, 70, 95, 100, 115],
    rows: [
      ['Cuti tahunan', 'Karyawan tetap', '12 hari/tahun', 'H-3', 'Tidak wajib', 'Saldo prorata untuk masa kerja di bawah 12 bulan.'],
      ['Cuti tahunan', 'Karyawan kontrak', '8 hari/tahun', 'H-3', 'Tidak wajib', 'Berlaku setelah probation selesai.'],
      ['Cuti sakit', 'Semua karyawan', 'Sesuai kebutuhan', 'Hari H', 'Surat dokter jika >1 hari', 'Wajib update manager sebelum pukul 10.00.'],
      ['Cuti melahirkan', 'Karyawan tetap', '90 hari kalender', 'H-30', 'Surat dokter', 'Koordinasikan handover minimal 2 minggu sebelum cuti.'],
      ['Cuti menikah', 'Semua karyawan', '3 hari kerja', 'H-14', 'Undangan/akta', 'Tidak memotong saldo cuti tahunan.'],
      ['Cuti keluarga inti meninggal', 'Semua karyawan', '3 hari kerja', 'Hari H', 'Surat keterangan', 'Dapat diperpanjang menggunakan cuti tahunan.'],
      ['Cuti ibadah', 'Karyawan tetap', '10 hari kerja', 'H-30', 'Bukti perjalanan', 'Maksimal sekali selama masa kerja.'],
      ['Cuti ujian sertifikasi', 'Karyawan tetap dan kontrak', '2 hari/tahun', 'H-14', 'Jadwal ujian', 'Sertifikasi harus relevan dengan role.'],
      ['Cuti force majeure', 'Semua karyawan', 'Kasus per kasus', 'Secepatnya', 'Bukti pendukung', 'Butuh approval People Operations.'],
    ],
    visual: 'leave-flow',
  },
  {
    code: 'HR-002',
    filename: 'HR-002-benefit-karyawan-2026',
    title: 'Benefit Karyawan 2026',
    owner: 'People Operations',
    effective: '1 Januari 2026',
    classification: 'Internal',
    intro:
      'Dokumen ini merangkum benefit karyawan berdasarkan tipe kontrak kerja. Beberapa benefit memiliki nama mirip, sehingga peserta perlu memvalidasi jawaban agent dengan citation yang benar.',
    sections: [
      {
        heading: 'Prinsip Eligibility',
        body:
          'Benefit berlaku berdasarkan status karyawan pada tanggal klaim diajukan. Perubahan status dari kontrak ke tetap mengikuti tanggal efektif pada HRIS, bukan tanggal verbal offer.',
      },
      {
        heading: 'Eligibility Allowance per Status Karyawan',
        body:
          'Intern tidak mendapat internet allowance dan tidak mendapat device allowance. Internet allowance sebesar Rp350.000 per bulan hanya untuk karyawan tetap dan kontrak yang bekerja hybrid atau remote dengan bukti tagihan. Device allowance sebesar Rp5.000.000 per 3 tahun hanya untuk karyawan tetap, dan bukan pengganti laptop kantor melainkan untuk perangkat pendukung. Internet allowance berbeda dari device allowance: internet allowance menanggung biaya langganan internet bulanan, sedangkan device allowance menanggung pembelian perangkat pendukung kerja.',
      },
    ],
    tableTitle: 'Matrix Benefit dan Eligibility',
    columns: ['Benefit', 'Karyawan Tetap', 'Kontrak', 'Intern', 'Limit / Frekuensi', 'Catatan'],
    widths: [100, 80, 70, 60, 100, 145],
    rows: [
      ['Asuransi kesehatan', 'Ya', 'Ya', 'Tidak', 'Sesuai plan', 'Kontrak mendapat plan dasar setelah 3 bulan.'],
      ['Wellness allowance', 'Ya', 'Ya', 'Tidak', 'Rp2.400.000/tahun', 'Dapat dipakai gym, mental health, atau olahraga.'],
      ['Internet allowance', 'Ya', 'Ya', 'Tidak', 'Rp350.000/bulan', 'Untuk karyawan hybrid/remote dengan bukti tagihan.'],
      ['Device allowance', 'Ya', 'Tidak', 'Tidak', 'Rp5.000.000/3 tahun', 'Bukan pengganti laptop kantor. Berlaku untuk perangkat pendukung.'],
      ['Training budget', 'Ya', 'Ya', 'Tidak', 'Rp8.000.000/tahun', 'Kontrak perlu approval Head of Department.'],
      ['Transport harian', 'Tidak', 'Tidak', 'Ya', 'Rp50.000/hari hadir', 'Hanya untuk intern onsite.'],
      ['Meal allowance lembur', 'Ya', 'Ya', 'Ya', 'Rp75.000/hari', 'Butuh approval manager sebelum lembur.'],
      ['Home office kit', 'Ya', 'Tidak', 'Tidak', 'Sekali saat onboarding', 'Kursi kerja, monitor, dan keyboard sesuai stok IT.'],
      ['Employee assistance program', 'Ya', 'Ya', 'Ya', '6 sesi/tahun', 'Konseling rahasia melalui vendor resmi.'],
      ['Parking reimbursement', 'Tidak disebutkan', 'Tidak disebutkan', 'Tidak disebutkan', '-', 'Tidak ada kebijakan parkir di dokumen ini.'],
    ],
    visual: 'benefit-summary',
  },
  {
    code: 'FIN-001',
    filename: 'FIN-001-reimburse-dan-perjalanan-dinas',
    title: 'Reimburse dan Perjalanan Dinas 2026',
    owner: 'Finance Operations',
    effective: '1 Januari 2026',
    classification: 'Internal',
    intro:
      'Dokumen ini berisi aturan klaim biaya operasional dan perjalanan dinas. Tabel limit sengaja dibuat panjang agar PDF pecah halaman dan header tabel harus berulang.',
    sections: [
      {
        heading: 'Quick Reference Limit Hotel',
        body:
          'Untuk pertanyaan validasi: limit hotel Tier 1 untuk role Staff adalah Rp1.200.000/malam. Angka Rp2.000.000 adalah threshold approval Head of Department, bukan limit hotel.',
      },
      {
        heading: 'Alur Approval',
        body:
          'Klaim diajukan oleh karyawan, disetujui manager, lalu direview Finance. Klaim di atas Rp2.000.000 memerlukan approval Head of Department sebelum Finance melakukan pembayaran.',
      },
    ],
    tableTitle: 'Matrix Limit Reimburse Per Tipe Biaya',
    columns: ['Tipe Biaya', 'Tier Kota', 'Role', 'Limit', 'Approval', 'Catatan'],
    widths: [95, 70, 80, 85, 95, 130],
    rows: [
      ['Hotel', 'Tier 1', 'Staff', 'Rp1.200.000/malam', 'Manager + Finance', 'Jakarta, Surabaya, Denpasar.'],
      ['Hotel', 'Tier 1', 'Manager+', 'Rp1.800.000/malam', 'HoD + Finance', 'Business justification wajib.'],
      ['Hotel', 'Tier 2', 'Staff', 'Rp900.000/malam', 'Manager + Finance', 'Bandung, Yogyakarta, Medan.'],
      ['Hotel', 'Tier 2', 'Manager+', 'Rp1.400.000/malam', 'HoD + Finance', 'Gunakan corporate rate jika tersedia.'],
      ['Hotel', 'Tier 3', 'Semua role', 'Rp700.000/malam', 'Manager + Finance', 'Kota selain tier 1 dan tier 2.'],
      ['Transport lokal', 'Semua kota', 'Semua role', 'Rp350.000/hari', 'Manager', 'Taksi online, parkir bandara, tol.'],
      ['Tiket pesawat', 'Domestik', 'Staff', 'Economy', 'Manager + Finance', 'Pembelian melalui travel desk.'],
      ['Tiket pesawat', 'Domestik', 'Manager+', 'Economy flex', 'HoD + Finance', 'Business class tidak diizinkan untuk domestik.'],
      ['Makan perjalanan', 'Tier 1', 'Semua role', 'Rp250.000/hari', 'Manager', 'Tidak perlu struk jika pakai per diem.'],
      ['Makan perjalanan', 'Tier 2', 'Semua role', 'Rp200.000/hari', 'Manager', 'Tidak bisa digabung dengan jamuan klien.'],
      ['Makan perjalanan', 'Tier 3', 'Semua role', 'Rp175.000/hari', 'Manager', 'Berlaku proporsional untuk perjalanan setengah hari.'],
      ['Internet perjalanan', 'Semua kota', 'Semua role', 'Rp150.000/trip', 'Manager', 'Berbeda dari internet allowance bulanan.'],
      ['Laundry', '>5 hari', 'Semua role', 'Rp100.000/trip', 'Finance', 'Hanya untuk perjalanan lebih dari lima hari.'],
      ['Kelebihan bagasi', 'Kasus khusus', 'Semua role', 'Rp500.000/trip', 'HoD + Finance', 'Harus terkait barang kerja/event.'],
      ['Klaim tanpa struk', 'Semua kota', 'Semua role', 'Maks Rp100.000', 'Finance', 'Maksimal dua transaksi per trip.'],
      ['Dokumen tidak lengkap', 'Semua kota', 'Semua role', 'Dikembalikan', 'Finance', 'Karyawan punya 5 hari kerja untuk revisi.'],
    ],
    visual: 'reimburse-flow',
    appendixImage: 'FORM-reimburse-scan.png',
  },
];

function safeText(value) {
  return String(value ?? '');
}

function writeMarkdown(spec) {
  const lines = [
    `# ${spec.title}`,
    '',
    `Kode dokumen: ${spec.code}`,
    `Owner: ${spec.owner}`,
    `Tanggal efektif: ${spec.effective}`,
    `Klasifikasi: ${spec.classification}`,
    '',
    spec.intro,
    '',
    ...spec.sections.flatMap((section) => ['## ' + section.heading, '', section.body, '']),
    '## ' + spec.tableTitle,
    '',
    `| ${spec.columns.join(' | ')} |`,
    `| ${spec.columns.map(() => '---').join(' | ')} |`,
    ...spec.rows.map((row) => `| ${row.join(' | ')} |`),
  ];
  fs.writeFileSync(path.join(DIRS.source, `${spec.filename}.md`), lines.join('\n'), 'utf8');
}

function pdfHeader(doc) {
  if (fs.existsSync(HEADER_IMAGE)) {
    doc.image(HEADER_IMAGE, 42, 24, { width: 512 });
  }
}

function pdfFooter(doc, spec, pageNumber) {
  if (fs.existsSync(FOOTER_IMAGE)) {
    doc.image(FOOTER_IMAGE, 42, 733, { width: 512 });
  }
  doc.fontSize(8).fillColor('#6a737d').text(`Halaman ${pageNumber}`, 48, 760, { align: 'right', width: 516 });
}

function drawWrappedText(doc, text, x, y, width, options = {}) {
  doc.font(options.bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(options.size || 8).fillColor(options.color || '#111827');
  doc.text(safeText(text), x, y, { width, align: 'left' });
  return doc.heightOfString(safeText(text), { width });
}

function drawTableHeader(doc, spec, x, y) {
  const headerHeight = 30;
  doc.rect(x, y, spec.widths.reduce((sum, value) => sum + value, 0), headerHeight).fill('#e7f0fb');
  let cursor = x;
  spec.columns.forEach((column, index) => {
    doc.rect(cursor, y, spec.widths[index], headerHeight).strokeColor('#9db7d8').stroke();
    drawWrappedText(doc, column, cursor + 4, y + 7, spec.widths[index] - 8, { bold: true, size: 7, color: '#0f3b61' });
    cursor += spec.widths[index];
  });
  return y + headerHeight;
}

function drawTable(doc, spec, startY) {
  const x = 36;
  const bottom = 736;
  let y = drawTableHeader(doc, spec, x, startY);
  spec.rows.forEach((row, rowIndex) => {
    const heights = row.map((cell, index) => doc.heightOfString(safeText(cell), { width: spec.widths[index] - 8 }) + 14);
    const rowHeight = Math.max(30, ...heights);
    if (y + rowHeight > bottom) {
      doc.addPage();
      y = drawTableHeader(doc, spec, x, 64);
    }
    let cursor = x;
    row.forEach((cell, index) => {
      doc.rect(cursor, y, spec.widths[index], rowHeight).fillAndStroke(rowIndex % 2 ? '#ffffff' : '#f8fafc', '#d0d7de');
      drawWrappedText(doc, cell, cursor + 4, y + 7, spec.widths[index] - 8, { size: 7 });
      cursor += spec.widths[index];
    });
    y += rowHeight;
  });
  return y;
}

function ensureSpace(doc, y, requiredHeight) {
  if (y + requiredHeight <= 728) return y;
  doc.addPage();
  return 64;
}

function drawFlowBox(doc, x, y, w, h, title, subtitle = '', options = {}) {
  doc.roundedRect(x, y, w, h, 8).fillAndStroke(options.fill || '#ffffff', options.stroke || '#2563eb');
  drawWrappedText(doc, title, x + 10, y + 12, w - 20, { bold: true, size: 8, color: options.color || '#0f172a' });
  if (subtitle) drawWrappedText(doc, subtitle, x + 10, y + 34, w - 20, { size: 7, color: '#334155' });
}

function drawArrow(doc, x1, y1, x2, y2) {
  doc.moveTo(x1, y1).lineTo(x2, y2).strokeColor('#64748b').lineWidth(1.5).stroke();
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 6;
  doc
    .moveTo(x2, y2)
    .lineTo(x2 - size * Math.cos(angle - Math.PI / 6), y2 - size * Math.sin(angle - Math.PI / 6))
    .lineTo(x2 - size * Math.cos(angle + Math.PI / 6), y2 - size * Math.sin(angle + Math.PI / 6))
    .closePath()
    .fillColor('#64748b')
    .fill();
}

function drawVisualSection(doc, spec, y) {
  if (!spec.visual) return y;
  y = ensureSpace(doc, y, 150);
  doc.font('Helvetica-Bold').fontSize(13).fillColor('#0f3b61').text('Visual proses dan catatan operasional', 48, y);
  y += 26;
  const x = 48;
  if (spec.visual === 'leave-flow') {
    drawFlowBox(doc, x, y, 110, 58, 'Ajukan cuti', 'HR Portal');
    drawFlowBox(doc, x + 142, y, 110, 58, 'Manager review', 'maks. 2 hari kerja');
    drawFlowBox(doc, x + 284, y, 110, 58, 'HR update', 'saldo & status');
    drawFlowBox(doc, x + 426, y, 90, 58, 'Notifikasi', 'ke karyawan');
    drawArrow(doc, x + 110, y + 29, x + 142, y + 29);
    drawArrow(doc, x + 252, y + 29, x + 284, y + 29);
    drawArrow(doc, x + 394, y + 29, x + 426, y + 29);
    y += 78;
    drawWrappedText(doc, 'Cuti sakit dapat dilaporkan pada hari H. Cuti khusus dan cuti melahirkan memerlukan dokumen pendukung sebelum approval final.', x, y, 500, { size: 8 });
    return y + 34;
  }
  if (spec.visual === 'benefit-summary') {
    drawFlowBox(doc, x, y, 140, 70, 'Karyawan tetap', 'Benefit penuh', { fill: '#ecfdf5', stroke: '#10b981' });
    drawFlowBox(doc, x + 188, y, 140, 70, 'Kontrak', 'Benefit dasar + approval', { fill: '#eff6ff', stroke: '#2563eb' });
    drawFlowBox(doc, x + 376, y, 140, 70, 'Intern', 'Benefit terbatas', { fill: '#fff7ed', stroke: '#f97316' });
    y += 92;
    drawWrappedText(doc, 'Internet allowance berbeda dari device allowance. Parking reimbursement tidak disebutkan dalam dokumen benefit ini.', x, y, 500, { size: 8 });
    return y + 34;
  }
  if (spec.visual === 'reimburse-flow') {
    drawFlowBox(doc, x, y, 106, 58, 'Submit klaim', 'karyawan');
    drawFlowBox(doc, x + 130, y, 108, 58, 'Manager', 'approval');
    drawFlowBox(doc, x + 262, y, 108, 58, 'Nilai klaim?', '<= / > Rp2 juta', { fill: '#ecfeff', stroke: '#0891b2' });
    drawFlowBox(doc, x + 394, y - 42, 122, 58, 'HoD approval', '> Rp2 juta', { fill: '#fef2f2', stroke: '#ef4444' });
    drawFlowBox(doc, x + 394, y + 42, 122, 58, 'Finance review', 'dokumen lengkap?');
    drawArrow(doc, x + 106, y + 29, x + 130, y + 29);
    drawArrow(doc, x + 238, y + 29, x + 262, y + 29);
    drawArrow(doc, x + 370, y + 20, x + 394, y - 14);
    drawArrow(doc, x + 370, y + 40, x + 394, y + 70);
    y += 122;
    drawWrappedText(doc, 'Jika dokumen tidak lengkap, klaim dikembalikan untuk revisi. Karyawan punya 5 hari kerja untuk melengkapi dokumen.', x, y, 500, { size: 8 });
    return y + 34;
  }
  return y;
}

function drawImageAppendix(doc, spec) {
  if (!spec.appendixImage) return;
  const imagePath = path.join(DIRS.assets, spec.appendixImage);
  if (!fs.existsSync(imagePath)) return;
  doc.addPage();
  pdfHeader(doc);
  doc.font('Helvetica-Bold').fontSize(15).fillColor('#0f3b61').text('Lampiran visual: contoh form klaim', 48, 104);
  doc.font('Helvetica').fontSize(9).fillColor('#334155').text('Lampiran ini menggambarkan tantangan dokumen hasil scan: tabel, stamp, checklist, dan status approval dalam satu gambar.', 48, 130, { width: 500 });
  doc.image(imagePath, 118, 166, { fit: [360, 520], align: 'center' });
}

function writePdf(spec) {
  const out = path.join(DIRS.pdf, `${spec.filename}.pdf`);
  const doc = new PDFDocument({ size: 'A4', margin: 48, bufferPages: true });
  doc.pipe(fs.createWriteStream(out));
  pdfHeader(doc);
  doc.fillColor('#111827').font('Helvetica-Bold').fontSize(20).text(spec.title, 48, 104, { width: 500 });
  doc.font('Helvetica').fontSize(10).fillColor('#374151').text(`Kode: ${spec.code} | Owner: ${spec.owner} | Efektif: ${spec.effective}`, 48, 156);
  doc.moveDown();
  doc.fontSize(10).fillColor('#111827').text(spec.intro, 48, 184, { width: 500, lineGap: 3 });
  let y = 245;
  for (const section of spec.sections) {
    doc.font('Helvetica-Bold').fontSize(13).fillColor('#0f3b61').text(section.heading, 48, y);
    y += 20;
    doc.font('Helvetica').fontSize(9).fillColor('#111827').text(section.body, 48, y, { width: 500, lineGap: 3 });
    y += doc.heightOfString(section.body, { width: 500 }) + 22;
  }
  y = drawVisualSection(doc, spec, y);
  doc.font('Helvetica-Bold').fontSize(13).fillColor('#0f3b61').text(spec.tableTitle, 48, y);
  drawTable(doc, spec, y + 24);
  drawImageAppendix(doc, spec);
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i += 1) {
    doc.switchToPage(i);
    pdfFooter(doc, spec, i - range.start + 1);
  }
  doc.end();
}

function paragraph(text, options = {}) {
  return new Paragraph({
    heading: options.heading,
    spacing: { before: options.before || 80, after: options.after || 80 },
    children: [new TextRun({ text, bold: Boolean(options.bold) })],
  });
}

function tableCell(text, width, header = false) {
  return new TableCell({
    borders: cellBorders,
    width: { size: width, type: WidthType.DXA },
    shading: header ? { fill: 'DDEBFA', type: ShadingType.CLEAR } : undefined,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    children: [new Paragraph({ children: [new TextRun({ text: safeText(text), bold: header, size: 18 })] })],
  });
}

async function writeDocx(spec) {
  const tableWidth = 9360;
  const columnWidth = Math.floor(tableWidth / spec.columns.length);
  const rows = [
    new TableRow({
      tableHeader: true,
      children: spec.columns.map((column) => tableCell(column, columnWidth, true)),
    }),
    ...spec.rows.map((row) => new TableRow({ children: row.map((cell) => tableCell(cell, columnWidth)) })),
  ];
  const doc = new Document({
    numbering: {
      config: [{ reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT }] }],
    },
    sections: [{
      headers: { default: new Header({ children: [paragraph(`${spec.code} | ${spec.classification} | ${spec.effective}`)] }) },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun('Halaman '), PageNumber.CURRENT] })] }) },
      children: [
        paragraph(spec.title, { heading: HeadingLevel.HEADING_1, bold: true }),
        paragraph(`Kode: ${spec.code} | Owner: ${spec.owner} | Efektif: ${spec.effective}`),
        paragraph(spec.intro),
        ...spec.sections.flatMap((section) => [paragraph(section.heading, { heading: HeadingLevel.HEADING_2, bold: true }), paragraph(section.body)]),
        paragraph(spec.tableTitle, { heading: HeadingLevel.HEADING_2, bold: true }),
        new Table({
          width: { size: tableWidth, type: WidthType.DXA },
          columnWidths: spec.columns.map(() => columnWidth),
          rows,
        }),
      ],
    }],
  });
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(DIRS.docx, `${spec.filename}.docx`), buffer);
}

function writeDiagramAssets() {
  const mmd = `flowchart LR
    A[Submit reimburse] --> B[Manager approval]
    B --> C{Nilai klaim}
    C -->|<= Rp2 juta| D[Finance review]
    C -->|> Rp2 juta| E[Head of Department approval]
    E --> D
    D --> F{Dokumen lengkap?}
    F -->|Ya| G[Pembayaran max 7 hari kerja]
    F -->|Tidak| H[Dikembalikan untuk revisi]
`;
  fs.writeFileSync(path.join(DIRS.diagrams, 'reimburse-approval.mmd'), mmd, 'utf8');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="520" viewBox="0 0 1200 520" role="img" aria-labelledby="title desc">
  <title id="title">Proses Persetujuan Reimburse</title>
  <desc id="desc">Diagram proses reimburse Contoso Indonesia berdasarkan sumber Mermaid.</desc>
  <rect width="1200" height="520" fill="#f8fafc"/>
  <style>.box{fill:#fff;stroke:#2563eb;stroke-width:2;rx:12}.decision{fill:#ecfeff;stroke:#0891b2;stroke-width:2}.txt{font-family:Arial,sans-serif;font-size:22px;fill:#0f172a}.small{font-size:18px;fill:#334155}.arrow{stroke:#475569;stroke-width:3;marker-end:url(#arrow)}</style>
  <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#475569"/></marker></defs>
  <rect class="box" x="40" y="210" width="180" height="84"/><text class="txt" x="70" y="246">Submit</text><text class="small" x="70" y="272">reimburse</text>
  <rect class="box" x="280" y="210" width="190" height="84"/><text class="txt" x="305" y="246">Manager</text><text class="small" x="305" y="272">approval</text>
  <polygon class="decision" points="590,170 710,252 590,334 470,252"/><text class="txt" x="535" y="247">Nilai</text><text class="small" x="532" y="273">klaim?</text>
  <rect class="box" x="760" y="105" width="230" height="84"/><text class="txt" x="790" y="141">Head of Dept</text><text class="small" x="790" y="167">approval</text>
  <rect class="box" x="760" y="315" width="190" height="84"/><text class="txt" x="790" y="351">Finance</text><text class="small" x="790" y="377">review</text>
  <polygon class="decision" points="1040,275 1140,357 1040,439 940,357"/><text class="txt" x="985" y="352">Lengkap?</text>
  <path class="arrow" d="M220 252 H280"/><path class="arrow" d="M470 252 H500"/><path class="arrow" d="M710 230 C740 190 745 155 760 147"/><path class="arrow" d="M710 275 C740 320 745 348 760 357"/><path class="arrow" d="M990 147 C1050 175 1070 250 1040 275"/><path class="arrow" d="M950 357 H970"/>
  <text class="small" x="720" y="215">&gt; Rp2 juta</text><text class="small" x="720" y="305">&lt;= Rp2 juta</text><text class="small" x="1020" y="475">Ya: bayar max 7 hari kerja</text><text class="small" x="760" y="455">Tidak: revisi 5 hari kerja</text>
</svg>`;
  fs.writeFileSync(path.join(DIRS.assets, 'DIAGRAM-proses-persetujuan.svg'), svg, 'utf8');
}

writeDiagramAssets();
for (const spec of documents) {
  writeMarkdown(spec);
  writePdf(spec);
  await writeDocx(spec);
}

console.log('Generated Contoso Indonesia corpus artifacts.');