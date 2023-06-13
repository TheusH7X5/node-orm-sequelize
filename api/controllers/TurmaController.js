const database = require("../models");

class TurmaController {
  static async pegarTodasAsTurmas(req, res) {
    try {
      const todasAsTurmas = await database.Turmas.findAll();
      return res.status(200).json(todasAsTurmas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegarUmaTurma(req, res) {
    const { id } = req.params;
    try {
      const umaTurma = await database.Turmas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(umaTurma);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async criarTurma(req, res) {
    const novaTurma = req.body;
    try {
      const novaTurmaCriada = await database.Niveis.create(novaTurma);
      return res.status(200).json(novaTurmaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizarTurma(req, res) {
    const { id } = req.params;
    const novasInfos = req.body;
    try {
      await database.Turmas.update(novasInfos, { where: { id: Number(id) } });
      const turmaAtualizada = await database.Turmas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(turmaAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async removerTurma(req, res) {
    const { id } = req.params;
    try {
      await database.Turma.destroy({ where: { id: Number(id) } });
      return res
        .status(200)
        .json({ message: `O id ${id} foi deletado com sucesso!` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = TurmaController;
