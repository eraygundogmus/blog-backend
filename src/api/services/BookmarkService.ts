import { Service } from "typedi";
import { OrmRepository } from "typeorm-typedi-extensions";

import { v4 as uuidv4 } from "uuid";

import { Bookmark } from "../models/Bookmark";
import { BookmarkRepository } from "../repositories/BookmarkRepository";

@Service()
export class BookmarkService {
  constructor(
    @OrmRepository() private bookmarkRepository: BookmarkRepository
  ) {}

  public get(): any {
    return this.bookmarkRepository.find();
  }

  public getOne(id: string): any {
    return this.bookmarkRepository.findOne(id);
  }

  public async create(bookmark: Bookmark): Promise<Bookmark | any> {
    bookmark.id = uuidv4();

    try {
      const newBookmark = await this.bookmarkRepository.save(bookmark);
      return newBookmark;
    } catch {
      return { error: "Bookmark did not created" };
    }
  }

  public async update(bookmark: Bookmark): Promise<Bookmark | any> {
    try {
      const updatedBookmark = await this.bookmarkRepository
        .findOne(bookmark.id)
        .then((bookmarkToUpdate) => {
          bookmarkToUpdate.url = bookmark.url;
          bookmarkToUpdate.description = bookmark.description;
          return this.bookmarkRepository.save(bookmarkToUpdate);
        });
      return updatedBookmark;
    } catch {
      return { error: "Bookmark did not updated" };
    }
  }

  public async delete(id: string): Promise<void> {
    await this.bookmarkRepository.delete(id);
    return;
  }
}
