import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// 🟢 ① GET:全件取得
app.get("/expenses", async (req, res) => {
  const expenses = await prisma.expense.findMany({
    orderBy: { spentAt: "desc" },
  });
  res.json(expenses);
});

// 🟢 ② POST:新規登録
app.post("/expenses", async (req, res) => {
  const { title, amount, category, spentAt } = req.body;
  const newExpense = await prisma.expense.create({
    data: { title, amount, category, spentAt: new Date(spentAt) },
  });
  res.status(201).json(newExpense);
});

// 🟢 ③ PUT:更新
app.put("/expenses/:id", async (req, res) => {
  const { id } = req.params;
  const { title, amount, category, spentAt } = req.body;
  const updatedExpense = await prisma.expense.update({
    where: { id: Number(id) },
    data: { title, amount, category, spentAt: new Date(spentAt) },
  });
  res.json(updatedExpense);
});

// 🟢 ④ DELETE:削除
app.delete("/expenses/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.expense.delete({ where: { id: Number(id) } });
  res.json({ message: "Deleted successfully" });
});

// サーバー起動
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
