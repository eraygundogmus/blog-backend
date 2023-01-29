import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";
import { Body, Get, JsonController, Post } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";

import { BookmarkService } from "../../services/BookmarkService";
import { Bookmark } from "../../models/Bookmark";

class BaseBookmark {
  @IsNotEmpty()
  public url: string;

  @IsNumber()
  public description: number;
}

export class BookmarkResponse extends BaseBookmark {
  @IsUUID()
  public id: string;
}

class CreateBookmarkBody extends BaseBookmark {
  @IsUUID()
  public id: string;
}

@JsonController("/bookmarks")
@OpenAPI({ security: [{ basicAuth: [] }] })
export class BookmarkController {
  constructor(private BookmarkService: BookmarkService) {}

  @Get()
  @ResponseSchema(BookmarkResponse, { isArray: true })
  public get(): Promise<Bookmark[]> {
    return this.BookmarkService.find();
  }

  @Post()
  @ResponseSchema(BookmarkResponse)
  public create(
    @Body({ required: true }) body: CreateBookmarkBody
  ): Promise<Bookmark> {
    const bookmark = new Bookmark();
    bookmark.url = body.url;
    bookmark.description = body.description;
    bookmark.id = body.id;

    return this.BookmarkService.create(bookmark);
  }
}
