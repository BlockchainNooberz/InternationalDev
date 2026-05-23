window.CIVIC_PDF = {
  exportBrief(sheetId) {
    const sheet = document.getElementById(sheetId);
    if (!sheet) {
      window.print();
      return;
    }

    const printDate = document.getElementById("print-date");
    if (printDate) {
      printDate.textContent = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }

    document.body.classList.add("pdf-export-mode");
    window.print();
    setTimeout(() => document.body.classList.remove("pdf-export-mode"), 500);
  },

  exportElement(title, html) {
    const win = window.open("", "_blank");
    if (!win) {
      alert("Allow pop-ups to export PDF, or use Print → Save as PDF.");
      return;
    }
    win.document.write(`<!DOCTYPE html><html><head><title>${title}</title>
      <link rel="stylesheet" href="assets/css/portal.css">
      <link rel="stylesheet" href="assets/css/portfolio.css">
      <style>@page{size:A4;margin:14mm}body{background:#fff;color:#111;padding:20px}</style>
      </head><body>${html}</body></html>`);
    win.document.close();
    win.onload = () => { win.print(); };
  }
};
