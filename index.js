const serverless = require("serverless-http");
const express = require("express");
const mongoose = require('mongoose')
const app = express();
const User = require('./user.model')
const Address = require('./address.model')
require('dotenv').config()
app.use(express.json())
module.exports.handler = serverless(app);

app.listen(process.env.PORT, () => {
  console.log(`Serviço funcionando na porta: ${process.env.PORT}`)
})


const connect = () => {
  mongoose.connect(process.env.DATABASE)
  .then(() => {
      console.log('Mongodb conectado com sucesso!')
      return true
  }).catch((e) => {
      console.log(e)
  })
}

const disconnect = () => {
  mongoose.disconnect().then(() => {
    console.log('MondoDB desconectado com sucesso')
    return true
  }).catch((e) => {
    console.log(e)
    return false
  })
}

connect();

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/path", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

app.get("/users", async (req, res, next) => {
  connect();
  const users = await User.find()
  console.log('Users', users)
  disconnect();
  return res.status(200).json({
    message: "Users endpoint",
    users
  })
})

app.get("/users/:id", async (req, res) => {
  try {
      const {id} = req.params
      const user = await User.findById(id)
      res.json(user)
  }catch(e){
      console.log(e)
  }    
})

app.put("/users/:id", async (req, res) => {
  try {
      const _id = req.params.id
      const user = await User.updateOne({_id}, req.body)
      res.json(user)
  } catch (e){
      console.log(e)
  }
})

app.delete("/users/:id", async (req, res) => {
  try {
      const _id = req.params.id
      const response = await User.deleteOne({ _id })
      res.json(response)
  }catch(e){
      console.log(e)
  }
 
})


app.post("/users", async (req, res) => {
  try {
      const user = new User(req.body)
      const response = await user.save()
      res.status(201).json(response)    
  }catch(e){
      console.log(e)
  }
  
})

//Address endpoints

app.get("/address", async (req, res) => {
  const address = await Address.find()
  res.json(address)
})

app.get("/address/:id", async (req, res) => {
  try {
      const {id} = req.params
      const address = await Address.findById(id)
      res.json(address)
  }catch(e){
      console.log(e)
  }    
})

app.put("/address/:id", async (req, res) => {
  try {
      const _id = req.params.id
      const address = await Address.updateOne({_id}, req.body)
      res.json(address)
  } catch (e){      
      console.log(e)
  }
})

app.delete("/address/:id", async (req, res) => {
  try {
      const _id = req.params.id
      const response = await Address.deleteOne({ _id })
      res.json(response)
  }catch(e){
      console.log(e)
  }
 
})

app.put("/address/:id", (req, res) => {
  try {
      const {id} = req.params
      const address = req.body
      res.json(response)
  }catch(e){
      console.log(e)
  }

  
})

app.post("/address", async (req, res) => {
  try {
      const address = new Address(req.body)
      const response = await address.save()
      res.status(201).json(response)    
  }catch(e){
      console.log(e)
  }
  
})
