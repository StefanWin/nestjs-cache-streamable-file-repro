import {
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  Header,
  Res,
  StreamableFile,
  UseInterceptors,
} from '@nestjs/common';
import * as fs from 'fs/promises';
import type { Response } from 'express';

const headers: Record<string, string> = {
  'Content-Disposition': `inline; corgi.jpg`,
  'Content-Type': 'image/jpeg',
};

const loadFile = async () => await fs.readFile('corgi.jpg');

@Controller()
export class AppController {
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(5)
  @Get('/with-cache-decorator/image.jpg')
  async defaultCache(
    @Res({ passthrough: true }) response: Response,
  ): Promise<StreamableFile> {
    const file = await loadFile();
    response.set(headers);
    return new StreamableFile(file);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(5)
  @Get('/without-headers/image.jpg')
  async withoutRes(): Promise<StreamableFile> {
    const file = await loadFile();
    return new StreamableFile(file);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(5)
  @Header('Content-Type', 'image/jpeg')
  @Header('Content-Disposition', 'inline; corgi.jpg')
  @Get('/fixed-headers/image.jpg')
  async fixedHeaders(): Promise<StreamableFile> {
    const file = await loadFile();
    return new StreamableFile(file);
  }

  @Get('/without-cache-decorator/image.jpg')
  async withoutCache(
    @Res({ passthrough: true }) response: Response,
  ): Promise<StreamableFile> {
    const file = await loadFile();
    response.set(headers);
    return new StreamableFile(file);
  }
}
