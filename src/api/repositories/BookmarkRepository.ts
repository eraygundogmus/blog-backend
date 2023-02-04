import { EntityRepository, Repository } from "typeorm";

import { Bookmark } from "../models/Bookmark";

@EntityRepository(Bookmark)
export class BookmarkRepository extends Repository<Bookmark> {}
