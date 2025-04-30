const express = require('express');
const { create } = require('xmlbuilder2'); // Para criar XML
const app = express();
const port = 3000;

// Modelos Sequelize
const { Customer, Product, Invoice, InvoiceLine } = require('./models'); // Ajuste conforme seus modelos

app.get('/api/generate-saft', async (req, res) => {
  try {
    // Consultar os dados do banco de dados via Sequelize
    const customers = await Customer.findAll();
    const products = await Product.findAll();
    const invoices = await Invoice.findAll({
      include: [
        { model: InvoiceLine, as: 'lines' }, // Inclui linhas de cada fatura
      ],
    });

    // Gerar conteúdo do XML
    const xml = create({ version: '1.0', encoding: 'UTF-8' })
      .ele('SAFT', { xmlns: 'urn:OECD:StandardAuditFile-Tax:PT_1.04_01' })
      .ele('Header')
        .ele('AuditFileVersion').txt('1.04').up()
        .ele('CompanyID').txt('123456789').up()
        .ele('CompanyName').txt('Petshop Felicidade').up()
      .up()
      .ele('MasterFiles');

    // Adicionar clientes
    customers.forEach(customer => {
      xml.ele('Customer')
        .ele('CustomerID').txt(customer.id).up()
        .ele('CompanyName').txt(customer.name).up()
      .up();
    });

    // Adicionar produtos
    products.forEach(product => {
      xml.ele('Product')
        .ele('ProductCode').txt(product.code).up()
        .ele('ProductDescription').txt(product.description).up()
      .up();
    });

    xml.up().ele('SourceDocuments').ele('SalesInvoices');

    // Adicionar faturas e linhas
    invoices.forEach(invoice => {
      const invoiceXML = xml.ele('Invoice')
        .ele('InvoiceNo').txt(invoice.invoiceNo).up()
        .ele('InvoiceDate').txt(invoice.date).up();

      invoice.lines.forEach(line => {
        invoiceXML.ele('Line')
          .ele('LineNumber').txt(line.lineNumber).up()
          .ele('ProductCode').txt(line.productCode).up()
          .ele('Quantity').txt(line.quantity).up()
          .ele('UnitPrice').txt(line.unitPrice).up()
          .ele('CreditAmount').txt(line.creditAmount).up()
        .up();
      });

      invoiceXML.up();
    });

    const xmlString = xml.end({ prettyPrint: true });

    // Configurar cabeçalhos para download
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Content-Disposition', 'attachment; filename="saft.xml"');

    // Enviar o XML como resposta
    res.status(200).send(xmlString);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao gerar SAFT.' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
