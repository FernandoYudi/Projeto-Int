const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/produtos', async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany();
    res.json(produtos);
  } catch (error) {
    console.error('Erro ao obter produtos do banco de dados:', error);
    res.status(500).json({ error: 'Erro ao obter produtos do banco de dados' });
  }
});

module.exports = router;
