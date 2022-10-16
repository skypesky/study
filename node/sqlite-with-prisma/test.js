const { PrismaClient } = require("@prisma/client");
const prismaClient = new PrismaClient();

async function main() {
  // 删除记录
  const batchPayload = await prismaClient.user.deleteMany();
  console.log("delete", batchPayload.count);

  // 创建记录
  const user = await prismaClient.user.create({
    data: {
      email: "2565978507@qq.com",
      name: "skypesky",
    },
  });
  console.log("create", user);

  // 更新记录
  const updatedUser = await prismaClient.user.update({
    where: {
      email: "2565978507@qq.com",
    },
    data: {
      name: "skypesky666",
    },
  });
  console.log("update", updatedUser);

  // 查询记录
  const users = await prismaClient.user.findMany();
  console.log("find", users);
}

main();
