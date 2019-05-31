import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { createStubInstance } from 'sinon';

describe('AppController', () => {
  let app: TestingModule;
  let appController: AppController;
  let appService: AppService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: createStubInstance(AppService),
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      jest.spyOn(appService, 'getHello').mockImplementationOnce(() => 'Hello World!');
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('getData', () => {
    it('should call getData twice', async () => {
      jest
        .spyOn(appService, 'getData')
        .mockImplementationOnce(async () => 1)
        .mockImplementationOnce(async () => 2);

      expect(await appController.getData()).toEqual([1, 2]);
    });
  });
});
