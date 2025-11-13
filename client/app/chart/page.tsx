'use client';
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AddExpenseModal from '../components/AddExpenseModal'; // ✅ 修正済みパス

type Expense = {
  id: number;
  title: string;
  amount: number;
  category: string;
  spentAt: string;
};

type ChartData = {
  name: string;
  value: number;
};

const COLORS = ['#c8a2c8', '#b48eca', '#f2c57c', '#e58f8f', '#a0d8ef'];

export default function ChartPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 仮データ（DB接続前）
  useEffect(() => {
    const dummy = [
      { id: 1, title: 'ランチ', amount: -1200, category: '食費', spentAt: '2025-11-01' },
      { id: 2, title: '給料', amount: 90000, category: '収入', spentAt: '2025-11-01' },
      { id: 3, title: '光熱費', amount: -7000, category: '生活費', spentAt: '2025-11-02' },
      { id: 4, title: 'カフェ', amount: -800, category: '娯楽', spentAt: '2025-11-03' },
      { id: 5, title: '交通費', amount: -1500, category: '通勤', spentAt: '2025-11-04' },
    ];
    setExpenses(dummy);
  }, []);

  // カテゴリごとの合計を集計
  useEffect(() => {
    const totals: Record<string, number> = {};
    expenses.forEach((e) => {
      if (e.amount < 0) {
        totals[e.category] = (totals[e.category] || 0) + Math.abs(e.amount);
      }
    });

    const data = Object.entries(totals).map(([key, value]) => ({
      name: key,
      value,
    }));
    setChartData(data);
  }, [expenses]);

  // 新規登録処理
  const handleAddExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = { id: expenses.length + 1, ...expense };
    setExpenses((prev) => [...prev, newExpense]);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      {/* タイトル */}
      <h1 className="text-2xl font-bold text-(--color-primary) mb-6 text-center">
        📊 カテゴリ別支出グラフ
      </h1>

      {/* 円グラフ */}
      <div className="bg-(--color-surface) p-4 rounded-lg shadow">
        {chartData.length === 0 ? (
          <p className="text-center text-gray-500">データがありません。</p>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* 新規登録ボタン */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-(--color-primary) text-white px-6 py-3 rounded-lg hover:bg-(--color-accent) transition"
        >
          ＋ 新規登録
        </button>
      </div>

      {/* モーダル */}
      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddExpense}
      />
    </div>
  );
}
