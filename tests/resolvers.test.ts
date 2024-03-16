import { resolvers } from "../src/resolvers/resolver";

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
        const filter = { id: 1 };
        await resolvers.Query.getDatas(null, { filter }, mockContext);
        expect(mockPrisma.data.findMany).toHaveBeenCalledWith({
          where: filter,
        });
      });
    });
  });

  describe("Mutation", () => {
    describe("createData", () => {
      test("should call prisma.data.create with correct arguments", async () => {
        const args = { title: "Test Title", author: "Test Author" };
        await resolvers.Mutation.createData(null, args, mockContext);
        expect(mockPrisma.data.create).toHaveBeenCalledWith({
          data: {
            title: args.title,
            author: args.author,
          },
        });
      });
    });

    describe("updateData", () => {
      test("should call prisma.data.update with correct arguments", async () => {
        const args = {
          id: 1,
          title: "Updated Title",
          author: "Updated Author",
        };
        await resolvers.Mutation.updateData(null, args, mockContext);
        expect(mockPrisma.data.update).toHaveBeenCalledWith({
          where: { id: args.id },
          data: {
            title: args.title,
            author: args.author,
          },
        });
      });
    });

    describe("deleteData", () => {
      test("should call prisma.data.delete with correct arguments", async () => {
        const args = { id: 1 };
        await resolvers.Mutation.deleteData(null, args, mockContext);
        expect(mockPrisma.data.delete).toHaveBeenCalledWith({
          where: { id: args.id },
        });
      });
    });
  });
});
