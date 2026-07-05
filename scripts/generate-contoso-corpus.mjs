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
      'Dokumen ini menjelaskan hak cuti, aturan pengajuan, dan pengecualian untuk karyawan Contoso Indonesia. Data di dokumen ini fiktif dan hanya dipakai untuk latihan Foundry IQ.',
    sections: [
      {
        heading: 'Prinsip Umum',
        body:
          'Semua cuti harus diajukan melalui HR Portal. Manager wajib memberikan keputusan maksimal dua hari kerja setelah permintaan diterima, kecuali cuti sakit yang dilaporkan setelah kejadian.',
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
    '',
    '> Dokumen ini fiktif dan hanya dipakai untuk latihan Foundry IQ.',
  ];
  fs.writeFileSync(path.join(DIRS.source, `${spec.filename}.md`), lines.join('\n'), 'utf8');
}

function pdfHeader(doc, spec) {
  doc.fontSize(9).fillColor('#4f5b66').text(`${spec.code} | ${spec.classification} | ${spec.effective}`, 48, 28);
  doc.moveTo(48, 44).lineTo(564, 44).strokeColor('#d0d7de').stroke();
}

function pdfFooter(doc, spec) {
  const page = doc.bufferedPageRange().count;
  doc.fontSize(8).fillColor('#6a737d').text(`Contoso Indonesia (fiktif) | ${spec.owner} | Halaman ${page}`, 48, 760, { align: 'center', width: 516 });
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
      pdfHeader(doc, spec);
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
}

function writePdf(spec) {
  const out = path.join(DIRS.pdf, `${spec.filename}.pdf`);
  const doc = new PDFDocument({ size: 'A4', margin: 48, bufferPages: true });
  doc.pipe(fs.createWriteStream(out));
  pdfHeader(doc, spec);
  doc.fillColor('#111827').font('Helvetica-Bold').fontSize(20).text(spec.title, 48, 64, { width: 500 });
  doc.font('Helvetica').fontSize(10).fillColor('#374151').text(`Kode: ${spec.code} | Owner: ${spec.owner} | Efektif: ${spec.effective}`, 48, 116);
  doc.moveDown();
  doc.fontSize(10).fillColor('#111827').text(spec.intro, 48, 144, { width: 500, lineGap: 3 });
  let y = 205;
  for (const section of spec.sections) {
    doc.font('Helvetica-Bold').fontSize(13).fillColor('#0f3b61').text(section.heading, 48, y);
    y += 20;
    doc.font('Helvetica').fontSize(9).fillColor('#111827').text(section.body, 48, y, { width: 500, lineGap: 3 });
    y += doc.heightOfString(section.body, { width: 500 }) + 22;
  }
  doc.font('Helvetica-Bold').fontSize(13).fillColor('#0f3b61').text(spec.tableTitle, 48, y);
  drawTable(doc, spec, y + 24);
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i += 1) {
    doc.switchToPage(i);
    pdfFooter(doc, spec);
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
        paragraph('Dokumen ini fiktif dan hanya dipakai untuk latihan Foundry IQ.'),
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
  <desc id="desc">Diagram proses reimburse fiktif Contoso Indonesia berdasarkan sumber Mermaid.</desc>
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