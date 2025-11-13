'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Expense = {
  id: number;
  title: string;
  amount: number;
  category: string;
  spentAt: string;
};

export default function ExpenseListPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // 仮データ（DB接続前）
  useEffect(() => {
    setExpenses([
      { id: 1, title: 'ランチ', amount: -1200, category: '食費', spentAt: '2025-10-21' },
      { id: 2, title: '給料', amount: 20000, category: '収入', spentAt: '2025-10-22' },
      { id: 3, title: '飲み物', amount: -300, category: '食費', spentAt: '2025-10-22' },
      { id: 4, title: '給料', amount: 90000, category: '収入', spentAt: '2025-10-17' },
    ]);
  }, []);

  const handleEdit = (id: number) => alert(`編集: ID ${id}`);
  const handleDelete = (id: number) => {
    if (confirm('削除しますか？')) {
      setExpenses(expenses.filter((e) => e.id !== id));
    }
  };

  return (
    <div>
      {/* タイトル */}
<div className="flex items-center justify-between mb-4">
  <h1 className="text-2xl font-bold text-(--color-primary)">📋 入出金一覧</h1>

  <Link
    href="/list/new"
    className="bg-(--color-primary) text-white px-4 py-2 rounded-lg hover:bg-(--color-accent) transition"
  >
    ＋ 新規登録
  </Link>
</div>

      {/* テーブル */}
      <div className="bg-(--color-surface) shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-(--color-secondary)">
            <tr>
              <th className="p-3 text-left border-b border-gray-200">日付</th>
              <th className="p-3 text-left border-b border-gray-200">内容</th>
              <th className="p-3 text-left border-b border-gray-200">カテゴリ</th>
              <th className="p-3 text-right border-b border-gray-200">金額</th>
              <th className="p-3 text-center border-b border-gray-200">操作</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id} className="hover:bg-(--color-secondary)">
                <td className="p-3 border-b">{exp.spentAt}</td>
                <td className="p-3 border-b">{exp.title}</td>
                <td className="p-3 border-b">{exp.category}</td>
                <td
                  className={`p-3 border-b text-right font-semibold ${
                    exp.amount < 0 ? 'text-red-500' : 'text-green-600'
                  }`}
                >
                  {exp.amount < 0 ? '' : '+'}
                  ¥{Math.abs(exp.amount).toLocaleString()}
                </td>
                <td className="p-3 border-b text-center space-x-2">
                  <button
                    onClick={() => handleEdit(exp.id)}
                    className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
