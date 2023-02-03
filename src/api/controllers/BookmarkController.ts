import { IsNotEmpty, IsUUID } from "class-validator";
import { Body, Get, JsonController, Post } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";

import { BookmarkService } from "../../services/BookmarkService";
import { Bookmark } from "../../models/Bookmark";
import Container from "typedi";

class BaseBookmark {
  @IsNotEmpty()
  public url: string;

  @IsNotEmpty()
  public description: string;
}

export class BookmarkResponse extends BaseBookmark {
  @IsUUID()
  public id: string;
}

class CreateBookmarkBody extends BaseBookmark {
  @IsUUID()
  public id: string;
}

@JsonController("/bookmark")
@OpenAPI({ security: [{ basicAuth: [] }] })
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get()
  public get(): Promise<Bookmark[]> {
    return this.bookmarkService.get();
  }

  @Post()
  @ResponseSchema(BookmarkResponse)
  public create(
    @Body({ required: true }) body: CreateBookmarkBody
  ): Promise<Bookmark> {
    const bookmark = new Bookmark();
    bookmark.url = body.url;
    bookmark.description = body.description;

    return this.bookmarkService.create(bookmark);
  }
}
