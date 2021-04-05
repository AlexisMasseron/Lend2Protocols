import { Test, TestingModule } from "@nestjs/testing";
import { AppService } from "../app.service";

describe("AppService", () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();
    appService = app.get<AppService>(AppService);
  });
  afterEach((): void => {
    jest.clearAllMocks();
  });

  it("should be defined", (): void => {
    expect(appService).toBeDefined();
  });
});
