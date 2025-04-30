const xmlbuilder = require('xmlbuilder');
const dotenv = require('dotenv')
dotenv.config()

module.exports = app => {
  const model = app.src.models.inventario
  const InventoryProducts = app.src.models.inventario_produtos
  const Crud = app.src.global.Crud
  const Product = app.src.models.produtos
  const invoice = app.src.models.fatura
  const Sale = app.src.models.venda
  const sale_product = app.src.models.venda_produto
  const Client = app.src.models.cliente
  const Provisioner = app.src.models.fornecedor_produto
  const SubProduct = app.src.models.sub_produtos
  const Family = app.src.models.familia_produto
  const Type = app.src.models.tipo_produto
  const AcertType = app.src.models.tipo_acerto
  const Stock = app.src.models.estoque_produto
  const users = app.src.models.usuario
  const Telephone = app.src.models.telefone
  const Gender = app.src.models.genero_usuario
  const Address = app.src.models.endereco
  const Payment_type = app.src.models.tipo_pagamento

  class Inventory extends Crud{
    async create(req, res) {
      try {
        const { products } = req.body;
        
        await model.create()
          .then((data)=> {
            products.map((p)=>{
              InventoryProducts.create({
                    fk_inventory: data.id,
                    quantity: p.quantity,
                    fk_product: p.fk_product,
                    fk_acert_type: p.fk_acert_type,
                })
                .then((pd)=>{
                    Stock.findOne({
                        where: { fk_product: p.fk_product },
                    })
                    .then((stock)=>{
                        stock.quantity = Number(p.quantity)
                        stock.save();
                    })
                })
            })
        })
        .then((data)=> res.status(201).json({sale: data, msg: 'Created'}))
        .catch((error) => res.status(400).json({msg: error.message}))
      
      } catch (error) {
        // Trata erros
        return res.status(400).json({ msg: error.message });
      }
    }

    async read(req, res) {
      model.findAll({
        where: {},
        raw: true , 
        attributes: ['id', 'date']
      })
      .then((data)=> {
        if (data.length != 0) res.status(200).json(data)
        else res.status(204).json({msg: 'Empty'})
      })
      .catch((error) => res.status(400).json({msg: error.message}))
    }

    async filter(req, res) {
      const id = req.params.params

      InventoryProducts.findAll({
        where: {
          fk_inventory: id
        },
        raw: true , 
        attributes: ['id', 'quantity', 'fk_product', 'fk_acert_type'],
        include: [
          {model: Product,
            attributes: ['id', 'name' , 'purchase_price', 'price', 'fk_subProduct',
              'fk_family', 'fk_type', 'fk_provisioner'],
            include: [
              {model: Family, attributes: ['family', 'description']},
              {model: Type, attributes: ['type', 'description']},
              {model: SubProduct, attributes: ['description']},
              {
                model: Provisioner, 
                attributes: ['id', 'name', 'email', 'fk_telephone'],
                include: [
                  {model: Telephone, attributes: ['id', 'telephone']},
                ]
              },
           ]
          },
          {model: AcertType, attributes: ['id', 'type']},
          {model: model, attributes: ['id', 'date']}
        ]
      })
      .then((data)=> {
        if (data.length != 0) res.status(200).json(data)
        else res.status(204).json({msg: 'Empty'})
      })
      .catch((error) => res.status(400).json({msg: error.message}))
    }

    async generate_saft(req, res) {
      try{
        // Consultar os dados do banco de dados via Sequelize
        const clients = await Client.findAll({
          where: {},
          raw: true , 
          attributes: ['id', 'name', 'email', 'nif', 'fk_telephone', 'fk_address', 'fk_gender'],
          include: [
            {model: Address, attributes: ['neighborhood','street','house']}, 
            {model: Telephone, attributes: ['telephone']}, 
            {model: Gender, attributes: ['gender']}
          ]
        })

        const products = await Product.findAll({
          where: {},
          raw: true,
          attributes: ['id','name' , 'purchase_price', 'price', 'manufacturing_date',
            'expiry_date', 'fk_subProduct', 'fk_family', 'fk_type', 'fk_provisioner'],
          include: [
              {model: Family, attributes: ['family', 'description']},
              {model: Type, attributes: ['type', 'description']},
              {model: SubProduct, attributes: ['description']}
          ]
        })

        const invoices = await invoice.findAll({
          where: {},
          raw: true , 
          attributes: ['id', 'code', 'fk_sale'],
          include: [
            {model: Sale, attributes: ['id','fk_payment_type', 'payment','troco','date'],
              include: [
                {
                  model: Client, 
                    attributes: ['id', 'name', 'email', 'nif', 'fk_telephone', 'fk_address', 'fk_gender'],
                    include: [
                      {model: Address, attributes: ['neighborhood', 'street', 'house']}, 
                      {model: Telephone, attributes: ['telephone']}, 
                      {model: Gender, attributes: ['gender']}
                    ]
                  },
                  {
                    model: users, 
                      attributes: ['id', 'name', 'email', 'birth_date', 'fk_telephone', 'fk_address', 'fk_gender'],
                      include: [
                        {model: Address, attributes: ['neighborhood', 'street', 'house']}, 
                        {model: Telephone, attributes: ['telephone']},
                        {model: Gender, attributes: ['gender']}
                      ]
                  },
                  { model: Payment_type, attributes: ['type'] }
              ]
            }
          ]
        })

        const salesData = await sale_product.findAll({
          where: {},
          raw: true,
          attributes: ['id', 'fk_sale', 'fk_product', 'quantity'],
          include: [
              {
                  model: Product, attributes: ['id', 'name', 'purchase_price',
                  'price', 'fk_subProduct', 'fk_family', 'fk_type', 'fk_provisioner'],
                  include: [
                      {model: Family, attributes: ['id', 'family', 'description']},
                      {model: Type, attributes: ['id', 'type', 'description']},
                      {model: SubProduct, attributes: ['description']},
                      {
                          model: Provisioner, 
                          attributes: ['id', 'name', 'email', 'fk_telephone'],
                          include: [
                              {model: Telephone, attributes: ['id', 'telephone']},
                          ]
                      }
                ]
              }
          ],
        })

        // Gerar conteúdo do XML
        const saft = xmlbuilder
        .create("SAF-T", { version: "1.0", encoding: "UTF-8" })
          .ele("Header")
          .ele('CompanyID').txt(process.env.ENTERPRISE_NIF).up()
          .ele('CompanyName').txt(process.env.ENTERPRISE_Name).up()
          .ele("FiscalYear", new Date().getFullYear()).up()
          .ele('CorrencyCode').txt(process.env.ENTERPRISE_CORRENCYCODE).up()
          .ele('CompanyAddress')
            .ele('AddressDetails').txt(process.env.ENTERPRISE_ADDRESS).up()
          .up()
        .up()
        .ele('MasterFiles');

        // Adicionar clientes
        clients.forEach(client => {
          const customer = saft.ele('Customer');
          
          customer.ele('CustomerID').txt(client?.id || 'N/A').up();
          customer.ele('CustumerName').txt(client?.name || 'N/A').up();
          
          // Verifique se o email existe antes de adicioná-lo
          if (client?.email) {
            customer.ele('CustumerEmail').txt(client.email).up();
          }
          
          customer.ele('CustumerNif').txt(client?.nif || 'N/A').up();
          
          // Verifique os dados de endereço
          const addressDetail = [
            client?.['tb_address.neighborhood'] || '',
            client?.['tb_address.street'] || '',
            client?.['tb_address.house'] || ''
          ].filter(Boolean).join(', '); // Junta as partes não nulas do endereço
        
          customer.ele('Address')
            .ele('AddressDetails')
            .txt(addressDetail || 'Endereço não disponível')
            .up()
            .up();
        });
        
        // Adicionar produtos
        products.forEach(product => {
          saft.ele('Product')
            .ele('ProductCode').txt(product?.id || 'N/A').up()
            .ele('ProductDescription').txt(product?.['tb_subProduct.description'] || 'Descrição indisponível').up()
            .ele('ProductPrice').txt(product?.price || '0.00').up()
          .up();
        });        

        //saft.up().ele('SourceDocuments').ele('SalesInvoices');

        const date = new Date()
        let saleDate = new Date()
        // Adicionar faturas e linhas
        invoices.forEach(invoice => {
          saleDate = invoice?.['tb_sale.date'] == null ? date : new Date(invoice?.['tb_sale.date'])
          const invoiceXML = saft.ele('Invoice')
            .ele('InvoiceNo').txt(invoice?.code).up()
            .ele('InvoiceDate').txt(saleDate.toLocaleDateString()).up();

            if (invoice?.fk_sale !== null) {
              const data = salesData.filter(sale => sale.fk_sale === invoice.fk_sale)
              const tot = data.reduce((sum, product) =>
                sum += Number(product?.['tb_product.price'] * product?.quantity), 0)

              if (data) {
                invoiceXML.ele('invoiceAmount').txt(tot).up()
                data.forEach(line=>{
                  invoiceXML.ele('Line')
                    .ele('ProductCode').txt(line?.['tb_product.id'] || '').up()
                    .ele('Price').txt(line?.['tb_product.price'] || '').up()
                    .ele('Description').txt(line?.['tb_product.tb_subProduct.description'] || '').up()
                    .ele('ProductQuantity').txt(line?.quantity || '').up()
                  .up()
                })
              }

            }else{
              invoiceXML.ele('invoiceAmount').txt(0).up()
            }

          invoiceXML.up();
        });

        const xmlString = saft.end({ prettyPrint: true });

        // Configurar cabeçalhos para download
        res.setHeader('Content-Type', 'application/xml');
        res.setHeader('Content-Disposition', 'attachment; filename="saft.xml"');

        // Enviar o XML como resposta
        res.status(200).send(xmlString);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao gerar SAFT.' });
      }
    }

    update(req, res){ super.update(req, res, model) }

    delete(req, res){ super.delete(req, res, model) }
  }

  return new Inventory()
}
