import { resolvers } from "../src/resolvers/resolver";
import { testData } from "./testData";

describe("Resolvers", () => {
  let mockContext: any;
  let mockPrisma: any;

  beforeEach(() => {
    mockPrisma = {
      data: {
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };
    mockContext = {
      prisma: mockPrisma,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Query", () => {
    describe("getDatas", () => {
      test("should call prisma.data.findMany with correct arguments", async () => {
        const filter = testData.filter;
        await resolvers.Query.getDatas(null, filter, mockContext);
        expect(mockPrisma.data.findMany).toHaveBeenCalledWith({
          where: {},
        });
      });
    });
  });

  describe("Mutation", () => {
    describe("createData", () => {
      test("should call prisma.data.create with correct arguments", async () => {
        const newData = testData.createDataArgs;
        await resolvers.Mutation.createData(null, newData, mockContext);
        expect(mockPrisma.data.create).toHaveBeenCalledWith({
          data: testData.createDataArgs,
        });
      });
    });

    describe("updateData", () => {
      test("should call prisma.data.update with correct arguments", async () => {
        const updateData = testData.updateDataArgs;
        const expectData = testData.updateDataValueArgs;
        await resolvers.Mutation.updateData(null, updateData, mockContext);
        expect(mockPrisma.data.update).toHaveBeenCalledWith({
          where: { id: updateData.id },
          data: expectData,
        });
      });
    });

    describe("deleteData", () => {
      test("should call prisma.data.delete with correct arguments", async () => {
        const deleteData = testData.deleteDataArgs;
        await resolvers.Mutation.deleteData(null, deleteData, mockContext);
        expect(mockPrisma.data.delete).toHaveBeenCalledWith({
          where: deleteData,
        });
      });
    });
  });

  describe("Subscription", () => {
    describe("dataChanged", () => {
      test("should subscribe to dataChanged event", async () => {
        const changeData = testData.subscriptionDataArgs;
        const iterator = resolvers.Subscription.dataChanged.subscribe();
        const mockIteratorNext = jest.fn().mockResolvedValue({
          value: { dataChanged: changeData },
          done: false,
        });
        iterator.next = mockIteratorNext;
        const result = await iterator.next();
        expect(result.value.dataChanged).toEqual(changeData);
      });
    });
  });
});
