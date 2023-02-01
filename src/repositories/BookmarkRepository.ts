import { EntityRepository, Repository } from "typeorm";

import { Bookmark } from "../models/Bookmark";

@EntityRepository(Bookmark)
export class BookmarkRepository extends Repository<Bookmark> {
  public getBookmarks(): Promise<any> {
    return this.createQueryBuilder().select().where(`bookmark`).getMany();
  }
}
