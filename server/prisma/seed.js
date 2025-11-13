import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 既存データ削除（開発用）
  await prisma.expense.deleteMany();

  await prisma.expense.createMany({
    data: [
      { title: 'ランチ', amount: -800, category: '食費', spentAt: new Date('2025-11-01') },
      { title: '給料', amount: 250000, category: '収入', spentAt: new Date('2025-11-01') },
      { title: '電車代', amount: -320, category: '交通費', spentAt: new Date('2025-11-02') },
    ],
  });
}

main()
  .then(() => {
    console.log('🌱  Seeding completed successfully!');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
