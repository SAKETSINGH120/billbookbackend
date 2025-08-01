// const puppeteer = require("puppeteer");
// const ejs = require("ejs");
// const path = require("path");
// const fs = require("fs");

// const generatePdf = async (service, design, data) => {
//   console.log("aaa gaya bro", service, design, data);
//   const templatePath = path.join(
//     __dirname,
//     `../pdfTemplates/${service}/${design}.ejs`
//   );
//   const html = await ejs.renderFile(templatePath, data);

//   // {
//   //   quotationNo: "89527",
//   //   lrDate: "04-02-2023",
//   //   customerName: "LK SINGH",
//   //   fromLocation: "Sector 14 Dwarka, Delhi",
//   //   toLocation: "Krishnapuri Road, Deoghar, Jharkhand",
//   //   companyName: "LK SINGH",
//   //   mobile: "+91 9540695403",
//   //   email: "info@packersmoversbilty.com",
//   //   vehicleType: "Shared / Separate",
//   //   shiftingDate: "24-02-2024",
//   //   charges: {
//   //     movement: "47000",
//   //     labour: "Included",
//   //     transportation: "Included",
//   //     loading: "Included",
//   //     addon: "0",
//   //     cargoProtection: "3000",
//   //     total: "50000",
//   //   },
//   //   remark: "Old and used household goods not for sale.",
//   //   signatory: "Evin Singh",
//   //   contactPhone: "+91 9540695403",
//   //   contactEmail: "info@packersmoversbilty.com",
//   // }

//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.setContent(html, { waitUntil: "networkidle0" });

//   const pdfBuffer = await page.pdf({ format: "A4" });
//   await browser.close();

//   return pdfBuffer;
// };

// module.exports = generatePdf;

const puppeteer = require("puppeteer");
const ejs = require("ejs");
const path = require("path");

const generatePdf = async (service, design, data) => {
  console.log("PDF generation started for", service, design);

  // Path to the EJS template
  const templatePath = path.join(
    __dirname,
    `../pdfTemplates/${service}/${design}.ejs`
  );

  // Render EJS template with data
  const html = await ejs.renderFile(templatePath, data);

  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: "new", // 'new' mode for latest Puppeteer versions
    args: ["--no-sandbox", "--disable-setuid-sandbox"], // Helpful if deploying on hosting like Heroku
    executablePath: puppeteer.executablePath(),
  });

  const page = await browser.newPage();

  // Set content and wait until all resources are loaded
  await page.setContent(html, {
    waitUntil: "networkidle0", // wait for no network connections for at least 500ms
  });

  // Generate PDF with full backgrounds/colors
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "10mm",
      bottom: "10mm",
      left: "10mm",
      right: "10mm",
    },
  });

  await browser.close();

  return pdfBuffer;
};

module.exports = generatePdf;
