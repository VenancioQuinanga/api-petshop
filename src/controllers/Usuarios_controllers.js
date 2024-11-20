module.exports = app => {
  const path = require('path');
  const model = app.src.models.usuario
  const Crud = app.src.global.Crud
  const Address = app.src.models.endereco
  const Telephone = app.src.models.telefone
  const Gender = app.src.models.genero_usuario
  const Category = app.src.models.categoria_usuario
  const generate_token = app.src.middlewares.gerar_token

  class User extends Crud{
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
          password: body.password,
          birth_date: body.birth_date,
          function: body.function,
          fk_telephone: telephoneData.id,
          fk_address: addressData.id,
          fk_gender: body.fk_gender,
          fk_category: body.fk_category,
        })
      })
      .then((data) => res.status(201).json({msg: 'Created'}))
      .catch((error) => res.status(400).json({msg: error.message}))
    }

    async read(req, res) {
      model.findAll({
        where: {},
        raw: true , 
        attributes: ['id', 'name', 'email', 'birth_date', 'function', 
        'fk_gender', 'fk_category', 'fk_address', 'fk_telephone'],
        include: [
          {model: Address, attributes: ['neighborhood','street','house']}, 
          {model: Telephone, attributes: ['telephone']}, 
          {model: Gender, attributes: ['gender']}, 
          {model: Category, attributes: ['category']}
        ]
      })
      .then((data)=> {
        if (data.length != 0) res.status(200).json(data)
        else res.status(204).json({msg: 'Empty'})
      })
      .catch((error) => res.status(400).json({msg: error.message}))
    }

    async authenticate(req, res){
      const email = req.body.email
      const password = req.body.password

      model.findOne({where: {email} })
      .then((data) => {
        if(!data) res.status(404).json({msg: 'Email inválido. '})
        else{ 
          if(data.password != password) res.status(404).json({msg: 'Senha inválida. '})
          else{
            generate_token(req, res, data.id, data.email)
          }
        }
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
        ['id', 'name', 'email', 'birth_date', 'fk_telephone', 'function',
          'fk_address', 'fk_gender', 'fk_category'],
        include: [
          {model: Address, attributes: ['id','neighborhood','street','house']}, 
          {model: Telephone, attributes: ['id','telephone']}, 
          {model: Gender, attributes: ['id','gender']}, 
          {model: Category, attributes: ['id','category']}
        ]
      })
      .then((data)=> {
        if (data.length != 0) res.status(200).json(data)
        else res.status(204).json({msg: 'Empty'})
      })
      .catch((error) => res.status(400).json({msg: error.message}))
    }

    async getUserByToken(req, res){
      const jwt = require('jsonwebtoken')
      const jwt_secret_key = app.src.configs.webtoken
      const token = req.params.token

      if (!token) return res.status(401).json({ error: "Acesso negado!" });

      // find user
      try {
        const decoded = jwt.verify(token, jwt_secret_key);
    
        const userId = decoded.id;
      
        await model.findOne({
          where: {
            id: userId
          },
          raw: true , 
          attributes: 
          ['id', 'name', 'email','birth_date','fk_telephone','fk_address','fk_gender','fk_category'],
        })
        .then((data)=> {
          if (data.length != 0) res.status(200).json(data)
          else res.status(204).json({msg: 'Empty'})
        })
        .catch((error) => res.status(400).json({msg: error.message}))
          const user = await model.findOne({where:{ id: userId 
        }});
      
      } catch (error) {
        return res.status(404).json({ msg: `${error}. Token inválido. ` });
      }
    }

    async update(req, res){
      try {
        const body = req.body;
        const params = req.params;
    
        // Atualiza o usuário
        const user = await model.findOne({
          where: { id: params.params }
        });
    
        if (user) {
          user.name = body.name
          user.email = body.email
          user.password = body.password
          user.birth_date = body.birth_date
          user.function = body.function
          user.fk_gender = body.fk_gender
          user.fk_category = body.fk_category

          await user.save();
        } else {
          return res.status(404).json({ msg: 'Usuário não encontrado!' });
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
        return res.status(201).json({ msg: 'Produto atualizado com sucesso!' });
    
      } catch (error) {
        // Trata erros
        return res.status(400).json({ msg: error.message });
      }
    }
    
    async getPhoto(req, res){
      try {
        const photo = req.params.photo;
        const photoPath = path.resolve(__dirname, '../../public/img/', photo); // Caminho absoluto
        res.status(200).sendFile(photoPath);
      } catch (err) {
        res.status(404).send(`Foto não encontrada.`);
      }
    }

    delete(req, res){ super.delete(req, res, model) }
  }

  return new User()
}
