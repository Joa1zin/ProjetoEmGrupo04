import Repository from "./Repository.js";
import UsuarioRepository from "./UsuarioRepository.js";

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const entidade = "feed"

class FeedRepository extends Repository {
  /**
   * Método para inserir post no feed
   * @param { string } data 
   */
  static async inserirFeed(data) {
    await this.inserir(data, entidade)
  }

  /**
   * Método para retornar o feed completo
   * @returns { Array<object> }
   */
  static async buscarFeed() {
    return this.buscar(entidade)
  }

  /**
   * Método para buscar feed por id do usuário
   * @param { string } id 
   * @returns { object }
   */
  static async buscarFeedPorUsuario(id) {
    return UsuarioRepository.buscarUsuarioUnico(id)
  }

  /**
   * Método para fazer update no feed do usuário
   * @param { object } data 
   * @param { string } id 
   */
  static async updateFeed(data, id) {
    await this.update(data, id, entidade)
  }

  static async postarFeed(feedId, postId, newData) {
    const feed = await prisma.feed.findUnique({
      where: {
        id: feedId,
      }
    });
  
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        post: newData,
      },
    });
  }

  /**
   * Método para deletar post do feed do usuário
   * @param { string } id 
   */
  static async deleteFeed(id) {
    await this.delete(id, entidade)
  }
}

export default FeedRepository