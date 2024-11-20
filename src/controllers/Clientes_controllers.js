module.exports = app => {
  const model = app.src.models.cliente
  const Crud = app.src.global.Crud
  const Address = app.src.models.endereco
  const Telephone = app.src.models.telefone
  const Gender = app.src.models.genero_usuario

  class Clients extends Crud{
    async create(req, res){
      const body = req.body
      let telephoneData

      Telephone.create({
        telephone : body['tb_telephone.telephone'],
      })
      .then((data)=> {   
        telephoneData = data
        return Address.create({
          neighborhood: body['tb_address.neighborhood'],
          street: body['tb_address.street'],
          house: body['tb_address.house'],
        })
        
      })
      .then((addressData)=>{
        
        return model.create({
          name: body.name,
          email: body.email, 
          nif: body.nif,         
          fk_telephone: telephoneData.id,
          fk_address: addressData.id,
          fk_gender: body.fk_gender
        })
      })
      .then((data) => res.status(201).json({msg: 'Created'}))
      .catch((error) => res.status(400).json({msg: error.message}))
    }

    async read(req, res) {
      model.findAll({
        where: {},
        raw: true , 
        attributes: ['id', 'name', 'email', 'nif', 'fk_telephone', 'fk_address', 'fk_gender'],
        include: [
          {model: Address, attributes: ['neighborhood','street','house']}, 
          {model: Telephone, attributes: ['telephone']}, 
          {model: Gender, attributes: ['gender']}
        ]
      })
      .then((data)=> {
        if (data.length != 0) res.status(200).json(data)
        else res.status(204).json({msg: 'Empty'})
      })
      .catch((error) => res.status(400).json({msg: error.message}))
    }
    
    async filter(req, res){
      const params = req.params.params

      await model.findOne({
        where: {
          id: params,
        },
        raw: true , 
        attributes: 
          ['id', 'name', 'email', 'nif', 'fk_telephone', 'fk_address', 'fk_gender'],
        include: [
          {model: Address, attributes: ['id','neighborhood','street','house']}, 
          {model: Telephone, attributes: ['id','telephone']}, 
          {model: Gender, attributes: ['id','gender']}
        ]
      })
      .then((data)=> {
        if (data.length != 0) res.status(200).json(data)
        else res.status(204).json({msg: 'Empty'})
      })
      .catch((error) => res.status(400).json({msg: error.message}))
    }

    async update(req, res){
      try {
        const body = req.body;
        const params = req.params;
    
        // Atualiza o cliente
        const client = await model.findOne({
          where: { id: params.params }
        });
    
        if (client) {
          console.log('cliente', body)
          client.name = body.name
          client.email = body.email
          client.fk_gender = body.fk_gender

          await client.save();
        } else {
          return res.status(404).json({ msg: 'Cliente não encontrado!' });
        }
    
        // Atualiza o telefone
        const telephone = await Telephone.findOne({
          where: { id: body.fk_telephone },
        });
    
        if (telephone) {
          telephone.telephone = body['tb_telephone.telephone']

          await telephone.save();
        } else {
          return res.status(404).json({ msg: 'Telefone não encontrado!' });
        }

        // Atualiza o endereço
        const address = await Address.findOne({
          where: { id: body.fk_address },
        });
    
        if (address) {
          address.neighborhood = body['tb_address.neighborhood']
          address.house = body['tb_address.house']
          address.street = body['tb_address.street']
          
          await address.save();
        } else {
          return res.status(404).json({ msg: 'Endereço não encontrado!' });
        }

        // Retorna sucesso
        return res.status(201).json({ msg: 'Cliente atualizado com sucesso!' });
    
      } catch (error) {
        // Trata erros
        return res.status(400).json({ msg: error.message });
      }
    }
        
    delete(req, res){ super.delete(req, res, model) }
  }

  return new Clients()
}
