'use client';
import { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (expense: {
    title: string;
    amount: number;
    category: string;
    spentAt: string;
  }) => void;
};

export default function AddExpenseModal({ isOpen, onClose, onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [spentAt, setSpentAt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !amount || !category || !spentAt) {
      alert('全ての項目を入力してください');
      return;
    }

    setIsLoading(true);
    try {
      // ✅ バックエンドへ保存
      const res = await fetch('http://localhost:3001/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          amount: Number(amount),
          category,
          spentAt,
        }),
      });

      if (!res.ok) throw new Error('登録に失敗しました');
      const newExpense = await res.json();

      // ✅ 親コンポーネントへ通知（state反映）
      onAdd(newExpense);

      // フォームリセット
      setTitle('');
      setAmount('');
      setCategory('');
      setSpentAt('');
      onClose();
    } catch (err) {
      console.error(err);
      alert('登録に失敗しました。サーバーを確認してください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center mb-4 text-(--color-primary)">
          📝 新規登録フォーム
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="項目"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <input
            type="number"
            placeholder="金額（支出はマイナス）"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="カテゴリ（例：食費・交通費）"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <input
            type="date"
            value={spentAt}
            onChange={(e) => setSpentAt(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <div className="flex gap-2 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
              disabled={isLoading}
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="flex-1 bg-(--color-primary) text-white py-2 rounded hover:bg-(--color-accent)"
              disabled={isLoading}
            >
              {isLoading ? '登録中...' : '登録'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
