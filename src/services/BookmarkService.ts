import { Service } from "typedi";
import uuid from "uuid";

import { Bookmark } from "../models/Bookmark";
import { BookmarkRepository } from "../repositories/BookmarkRepository";

@Service()
export class BookmarkService {
  constructor(private bookmarkRepository: BookmarkRepository) {}

  public find(): Promise<Bookmark[]> {
    return this.bookmarkRepository.find();
  }

  public async create(bookmark: Bookmark): Promise<Bookmark> {
    bookmark.id = uuid.v1();
    const newBookmark = await this.bookmarkRepository.save(bookmark);
    return newBookmark;
  }

  public async delete(id: string): Promise<void> {
    await this.bookmarkRepository.delete(id);
    return;
  }
}
