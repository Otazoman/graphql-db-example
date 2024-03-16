import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    getDatas: async (parent, { filter }, context) => {
      let where = {};
      if (filter) {
        where = { ...filter };
        if (filter.id !== undefined && typeof filter.id === "string") {
          where = { ...where, id: parseInt(filter.id, 10) };
        }
      }
      if (!context.prisma) {
        context.prisma = new PrismaClient();
      }
      return context.prisma.data.findMany({
        where,
      });
    },
  },
  Mutation: {
    createData: async (_parent, args, context) => {
      if (!context.prisma) {
        context.prisma = new PrismaClient();
      }
      try {
        const newData = await context.prisma.data.create({
          data: {
            title: args.title,
            author: args.author,
          },
        });
        return newData;
      } catch (error) {
        console.error("Error creating data:", error);
        throw new Error("Failed to create data");
      }
    },
    updateData: async (_parent, args, context) => {
      if (!context.prisma) {
        context.prisma = new PrismaClient();
      }
      try {
        const updatedData = await context.prisma.data.update({
          where: {
            id: parseInt(args.id),
          },
          data: {
            title: args.title,
            author: args.author,
          },
        });
        return updatedData;
      } catch (error) {
        console.error("Error updating data:", error);
        throw new Error("Failed to update data");
      }
    },
    deleteData: async (_parent, args, context) => {
      if (!context.prisma) {
        context.prisma = new PrismaClient();
      }
      try {
        await context.prisma.data.delete({
          where: {
            id: parseInt(args.id),
          },
        });
        return true;
      } catch (error) {
        console.error("Error deleting data:", error);
        throw new Error("Failed to delete data");
      }
    },
  },
};
