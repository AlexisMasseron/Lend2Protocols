import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "../app.controller";
import { AppService } from "../app.service";
import {
  testAddress,
  testAmountToBorrow,
  testAmountToRepay,
  testDelegation2,
  testDelegations,
  testDelegationsRebalance,
  testDelegationWhale,
  testDelegator1Borrow,
  testDelegatorsBorrow,
  testDelegatorsRepay,
  testExcessiveAmountToBorrow,
  testExcessiveAmountToRepay,
  unknownAddress,
} from "./app.test-data";

jest.mock("../app.service.ts");

describe("AppController", () => {
  let appController: AppController;
  let appServiceMockInstance: AppService;
  const appServiceMock = AppService as jest.Mock<AppService>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appServiceMockInstance = appServiceMock.mock.instances[0];
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  describe("ALLOW a borrower to get funds from the platform", () => {
    it("should call allow with the address", async () => {
      // Act
      const allowSpy = jest
        .spyOn(appServiceMockInstance, "allow")
        .mockResolvedValue();
      await appController.allow(testAddress);

      // Assert
      expect(allowSpy).toHaveBeenCalled;
      expect(allowSpy).toHaveBeenCalledWith(testAddress);
    });
  });

  describe("BORROW an amount from the pool", () => {
    it("should get delegations from the contract and proceed to borrow", async () => {
      // Arrange
      const getDelegationsSpy = jest
        .spyOn(appServiceMockInstance, "getDelegations")
        .mockResolvedValue(testDelegations);
      const borrowSpy = jest
        .spyOn(appServiceMockInstance, "borrow")
        .mockResolvedValue();

      // Act
      await appController.borrow(testAmountToBorrow);

      // Assert
      expect(getDelegationsSpy).toHaveBeenCalled;
      expect(borrowSpy).toHaveBeenCalledWith(testDelegatorsBorrow);
    });
    it("should throw an error if there is not enough capacity", async () => {
      // Arrange
      const getDelegationsSpy = jest
        .spyOn(appServiceMockInstance, "getDelegations")
        .mockResolvedValue(testDelegations);
      const borrowSpy = jest
        .spyOn(appServiceMockInstance, "borrow")
        .mockResolvedValue();

      // Act
      try {
        appController.borrow(testExcessiveAmountToBorrow);
      } catch (err) {
        expect(err.message).toEqual("All capacity used");
      }

      // Assert
      expect(getDelegationsSpy).toHaveBeenCalled;
      expect(borrowSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe("REPAY debt to the pool", () => {
    it("should get delegations from the contract and proceed to repayment", async () => {
      // Arrange
      const getDelegationsSpy = jest
        .spyOn(appServiceMockInstance, "getDelegations")
        .mockResolvedValue(testDelegations);
      const repaySpy = jest
        .spyOn(appServiceMockInstance, "repay")
        .mockResolvedValue();

      // Act
      await appController.repay(testAmountToRepay);

      // Assert
      expect(getDelegationsSpy).toHaveBeenCalled;
      expect(repaySpy).toHaveBeenCalledWith(testDelegatorsRepay);
    });
    it("should throw an error if the amount to repay is too high", async () => {
      // Arrange
      const getDelegationsSpy = jest
        .spyOn(appServiceMockInstance, "getDelegations")
        .mockResolvedValue(testDelegations);
      const repaySpy = jest
        .spyOn(appServiceMockInstance, "repay")
        .mockResolvedValue();

      // Act
      try {
        appController.borrow(testExcessiveAmountToRepay);
      } catch (err) {
        expect(err.message).toEqual("Amount to repay too high");
      }
      // Assert
      expect(getDelegationsSpy).toHaveBeenCalled;
      expect(repaySpy).toHaveBeenCalledTimes(0);
    });
  });

  describe("get instructions on how to REBALANCE", () => {
    it("should return the array of delegators to use in the rebalancing", async () => {
      // Arrange
      const getDelegationsSpy = jest
        .spyOn(appServiceMockInstance, "getDelegations")
        .mockResolvedValue(testDelegations);
      const expectedDelegators = [testDelegator1Borrow];
      // Act
      const delegators = await appController.rebalance(
        testDelegation2.delegatorAddress
      );

      // Assert
      expect(delegators).toEqual;
    });
    it("should return an empty array if the capacity is not enough", async () => {
      // Arrange
      const getDelegationsSpy = jest
        .spyOn(appServiceMockInstance, "getDelegations")
        .mockResolvedValue(testDelegationsRebalance);

      // Act
      const delegators = await appController.rebalance(
        testDelegationWhale.delegatorAddress
      );

      // Assert
      expect(delegators).toEqual([]);
    });

    it("should return an empty array if the address is not found in the delegations", async () => {
      // Arrange
      const getDelegationsSpy = jest
        .spyOn(appServiceMockInstance, "getDelegations")
        .mockResolvedValue(testDelegations);

      // Act
      const delegators = await appController.rebalance(unknownAddress);

      // Assert
      expect(delegators).toEqual([]);
    });
  });
});
