import { App, Controller, Get, Inject } from '@midwayjs/decorator';
import { Application, Context } from '@midwayjs/koa';

@Controller('/')
export class DocController {

  @Inject()
  ctx: Context;

  @App()
  app: Application;

  @Get('/docs/context/setAttrAndGetAttr')
  async setAttrAndGetAttrByContext(): Promise<string> {
    this.ctx.setAttr('abc', {
      a: 1,
      b: 2,
    });
    const value: string = this.ctx.getAttr('abc');
    // { a: 1, b: 2 }
    console.log(value);
    return `getAttr success: ${JSON.stringify(value)}`;
  }

  @Get('/docs/app/setAttrAndGetAttr', {
    summary: '哈哈',
  })
  async setAttrAndGetAttrByApp(): Promise<string> {
    this.app.setAttr('abc', {
      a: 1,
      b: 2,
    });
    const value = this.app.getAttr('abc');
    // { a: 1, b: 2 }
    console.log(value);
    return `getAttr success: ${JSON.stringify(value)}`;
  }

}
