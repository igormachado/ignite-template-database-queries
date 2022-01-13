import { getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // return this.repository.createQueryBuilder();
    // Complete usando query builder
    return this.repository
    .createQueryBuilder("game").
    where("game.title ilike :title", { title:`%${param}%` })
    .getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("SELECT COUNT(*) from games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // return this.repository.createQueryBuilder("SELECT id from Game");
    // Complete usando query builder
    return this.repository
    .createQueryBuilder('game')
    .where("game.id = :id", { id })
    .relation(Game, 'users')
    .of(id)
    .loadMany();
  }
}
