'use client';
import { useState, useEffect } from 'react';
import AddExpenseModal from './components/AddExpenseModal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type Expense = {
  id: number;
  title: string;
  amount: number;
  category: string;
  spentAt: string;
};

export default function HomePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // ✅ DBから支出データを取得
  const fetchExpenses = async () => {
    try {
      const res = await fetch('http://localhost:3001/expenses');
      if (!res.ok) throw new Error('データ取得に失敗しました');
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ✅ モーダルから受け取る登録処理
  const handleAddExpense = async (expense: Omit<Expense, 'id'>) => {
    try {
      const res = await fetch('http://localhost:3001/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });
      if (!res.ok) throw new Error('登録に失敗しました');
      await fetchExpenses(); // 🎯 DB更新後に再取得
      setIsModalOpen(false);
    } catch (err) {
      console.error('登録エラー:', err);
      alert('登録に失敗しました。サーバーを確認してください。');
    }
  };

  // 🟢 日ごとの合計
  const getDailyTotal = (date: Date) => {
    const dateStr = date.toLocaleDateString('sv-SE');
    const daily = expenses.filter((e) => e.spentAt.startsWith(dateStr));
    return daily.reduce((sum, e) => sum + e.amount, 0);
  };

  // 💰 合計計算
  const totalIncome = expenses.filter(e => e.amount > 0).reduce((sum, e) => sum + e.amount, 0);
  const totalExpense = expenses.filter(e => e.amount < 0).reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome + totalExpense;

  // 📅 選択日の明細
  const selectedStr = selectedDate.toLocaleDateString('sv-SE');
  const dailyList = expenses.filter((e) => e.spentAt.startsWith(selectedStr));

  return (
    <div className="p-6">
      {/* タイトル */}
      <h1 className="text-2xl font-bold text-(--color-primary) mb-6 text-center">
        💰 家計簿ホーム
      </h1>

      {/* 新規登録ボタン */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-(--color-primary) text-white px-6 py-3 rounded-lg hover:bg-(--color-accent) transition"
        >
          ＋ 新規登録
        </button>
      </div>

      {/* サマリー */}
      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div className="bg-(--color-surface) p-4 rounded-lg shadow">
          <h2 className="text-sm font-semibold text-gray-600">💵 入金</h2>
          <p className="text-lg font-bold text-green-600">
            ¥{totalIncome.toLocaleString()}
          </p>
        </div>
        <div className="bg-(--color-surface) p-4 rounded-lg shadow">
          <h2 className="text-sm font-semibold text-gray-600">💸 出金</h2>
          <p className="text-lg font-bold text-red-500">
            ¥{Math.abs(totalExpense).toLocaleString()}
          </p>
        </div>
        <div className="bg-(--color-surface) p-4 rounded-lg shadow">
          <h2 className="text-sm font-semibold text-gray-600">📊 残高</h2>
          <p className="text-lg font-bold text-(--color-primary)">
            ¥{balance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* カレンダー＋詳細 */}
      <div className="grid grid-cols-2 gap-6">
        {/* カレンダー */}
        <div className="bg-(--color-surface) rounded-lg shadow p-4">
          <h2 className="font-semibold text-(--color-primary) mb-2">🗓 カレンダー</h2>
          <Calendar
            onChange={(value) => {
              if (value instanceof Date) setSelectedDate(value);
            }}
            value={selectedDate}
            tileContent={({ date }) => {
              const total = getDailyTotal(date);
              return total !== 0 ? (
                <div
                  className={`text-xs ${
                    total > 0 ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {total > 0 ? '+' : ''}
                  {total.toLocaleString()}
                </div>
              ) : null;
            }}
          />
        </div>

        {/* 選択日の明細 */}
        <div className="bg-(--color-surface) rounded-lg shadow p-4">
          <h2 className="font-semibold text-(--color-primary) mb-2">
            📋 {selectedStr} の入出金
          </h2>
          {dailyList.length === 0 ? (
            <p className="text-gray-500">特になし</p>
          ) : (
            <ul>
              {dailyList.map((e) => (
                <li key={e.id} className="flex justify-between border-b py-1">
                  <span>{e.title}</span>
                  <span
                    className={`font-semibold ${
                      e.amount < 0 ? 'text-red-500' : 'text-green-600'
                    }`}
                  >
                    {e.amount < 0 ? '' : '+'}¥{Math.abs(e.amount).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 🟣 モーダル */}
      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddExpense}
      />
    </div>
  );
}
