const puppeteer = require('puppeteer');

const generateHTMLContent = (couriers) => {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long"
    };
    let tableRows = couriers.map(courier => {
        const customers = courier.customers.map(c =>
            `<li>${c.name} (${c.email})</li>`)
            .join('');
        return `
            <tr>
                <td>${courier.id}</td>
                <td>${courier.createdAt.toLocaleString("en-US", options)}</td>
                <td>${courier.name}</td>
                <td>${courier.vehicleType}</td>
                <td>${courier.createdAt.toLocaleDateString()}</td>
                <td><ul>${customers}</ul></td>
            </tr>
        `;
    }).join('');

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Couriers Report</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
        <div class="container-fluid pb-4">
            <div class="row">
                <div class="col-6 p-2 px-5">
                    <img src="https://media.designrush.com/agencies/677935/conversions/iProgrammer-logo-profile.jpg"
                        height="90" width="200" alt="Logo">
                </div>
                <div class="col-6 d-flex justify-content-center align-self-center pt-3">
                    <div class="col-6">
                        <p>Date:<br>
                             <span class="text-danger fw-bold">${new Date().toLocaleDateString()}</span></p>
                    </div>
                    <div class="col-6">
                        <p>Invoice #:<br> <span class="text-danger fw-bold">${Math.floor((Math.random() * 10000))}</span></p>
                    </div>
                </div>
            </div>
        </div>
            <div class="container mt-5">
                <h1 class="text-center mb-4">Couriers Report</h1>
                <table class="table">
                    <thead class="table-danger">
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Shipped</th>
                            <th>Customers</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </div>
        </body>
        </html>
    `;
};

const generatePDF = async (htmlContent) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'load' });

    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        landscape: true,
        displayHeaderFooter: true,
        footerTemplate: `
            <div style="font-size: 10px; width: 100%; text-align: center; margin: 0 auto;">
                Page <span class="pageNumber"></span> of <span class="totalPages"></span>
            </div>`,
        headerTemplate: '<div></div>', // Optional: Empty header
        margin: {
            top: '10mm', // Adjust as needed
            bottom: '15mm' // Adjust as needed
        }
    });

    await browser.close();
    return pdfBuffer;
};

module.exports = {
    generateHTMLContent,
    generatePDF,
};
