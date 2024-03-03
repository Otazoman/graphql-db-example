import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    datas: async (parent, args, context) => {
      if (!context.prisma) {
        context.prisma = new PrismaClient();
      }
      return context.prisma.data.findMany();
    },
  },
  Mutation: {
    post: async (_parent, args, context) => {
      if (!context.prisma) {
        context.prisma = new PrismaClient();
      }
      const newData = context.prisma.data.create({
        data: {
          title: args.title,
          author: args.author,
        },
      });
      return newData;
    },
  },
};
