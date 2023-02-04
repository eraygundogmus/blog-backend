import { IsNotEmpty, IsUUID } from "class-validator";
import {
  Body,
  Get,
  JsonController,
  Post,
  Patch,
  Param,
  Delete,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";

import { BookmarkService } from "../services/BookmarkService";
import { Bookmark } from "../models/Bookmark";

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

@JsonController("/bookmark")
@OpenAPI({ security: [{ basicAuth: [] }] })
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get()
  public get(): Promise<Bookmark[]> {
    return this.bookmarkService.get();
  }

  @Get("/:id")
  @ResponseSchema(BookmarkResponse)
  public getOne(@Param("id") id: string): Promise<Bookmark> {
    return this.bookmarkService.getOne(id);
  }

  @Post()
  @ResponseSchema(BookmarkResponse)
  public create(
    @Body({ required: true }) body: BaseBookmark
  ): Promise<Bookmark> {
    const bookmark = new Bookmark();
    bookmark.url = body.url;
    bookmark.description = body.description;
    return this.bookmarkService.create(bookmark);
  }

  @Patch("/:id")
  @ResponseSchema(BookmarkResponse)
  public update(
    @Param("id") id: string,
    @Body({ required: true }) body: BaseBookmark
  ): Promise<Bookmark> {
    const bookmark = new Bookmark();
    bookmark.id = id;
    bookmark.url = body.url;
    bookmark.description = body.description;
    return this.bookmarkService.update(bookmark);
  }

  @Delete("/:id")
  public delete(@Param("id") id: string): Promise<void> {
    return this.bookmarkService.delete(id);
  }
}
