// const generatePdf = require("../../../utils/generatePdf");

// exports.createPdf = async (req, res) => {
//   const { service, design } = req.params;
//   const data = req.body;
//   console.log("hello coming");
//   try {
//     const pdfBuffer = await generatePdf(service, design, data);
//     res.set({
//       "Content-Type": "application/pdf",
//       "Content-Disposition": `attachment; filename=${design}.pdf`,
//     });
//     res.send(pdfBuffer);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const generatePdf = require("../../../utils/generatePdf");
const Quotation = require("../../../models/quotation"); // adjust path/model
const Company = require("../../../models/company"); // adjust path/model

exports.createPdf = async (req, res) => {
  const { service, design } = req.params;
  const { userId } = req.query; // or req.params if you prefer /pdf/:service/:design/:id

  try {
    // 1. Fetch data from MongoDB
    const companyDetails = await Company.findOne({
      userId: "684bb8848d4afb01f4c5c5f8",
    });
    if (!companyDetails) {
      return res.status(404).json({ error: "Company not found" });
    }

    console.log("companyDetails", companyDetails);

    const quatatioData = await Quotation.findOne({
      userId: "684bb8848d4afb01f4c5c5f8",
    });
    if (!quatatioData) {
      return res.status(404).json({ error: "Quotation not found" });
    }

    console.log("quatatioData", quatatioData);

    // Merge both responses into one object
    const mergedData = {
      companyDetails,
      quotationData: quatatioData,
    };

    console.log("Merged Data", JSON.stringify(mergedData));

    // 2. Generate PDF
    const pdfBuffer = await generatePdf(service, design, mergedData);

    // 3. Send PDF to client
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${design}.pdf`,
    });
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
