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
        await resolvers.Query.getDatas(null, testData.filter, mockContext);
        expect(mockPrisma.data.findMany).toHaveBeenCalledWith({
          where: {},
        });
      });
    });
  });

  describe("Mutation", () => {
    describe("createData", () => {
      test("should call prisma.data.create with correct arguments", async () => {
        await resolvers.Mutation.createData(
          null,
          testData.createDataArgs,
          mockContext
        );
        expect(mockPrisma.data.create).toHaveBeenCalledWith({
          data: testData.createDataArgs,
        });
      });
    });

    describe("updateData", () => {
      test("should call prisma.data.update with correct arguments", async () => {
        await resolvers.Mutation.updateData(
          null,
          testData.updateDataArgs,
          mockContext
        );
        expect(mockPrisma.data.update).toHaveBeenCalledWith({
          where: { id: testData.updateDataArgs.id },
          data: testData.updateDataValueArgs,
        });
      });
    });

    describe("deleteData", () => {
      test("should call prisma.data.delete with correct arguments", async () => {
        await resolvers.Mutation.deleteData(
          null,
          testData.deleteDataArgs,
          mockContext
        );
        expect(mockPrisma.data.delete).toHaveBeenCalledWith({
          where: testData.deleteDataArgs,
        });
      });
    });
  });
});
