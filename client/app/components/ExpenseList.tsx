'use client';
type Expense = {
  id: number;
  title: string;
  amount: number;
  category: string;
  spentAt: string;
};

type Props = {
  expenses: Expense[];
  selectedDate: Date | null;
};

export default function ExpenseList({ expenses, selectedDate }: Props) {
  if (!selectedDate) return <p>日付を選択してください。</p>;

  const dateStr = selectedDate.toISOString().split('T')[0];
  const filtered = expenses.filter(
    (e) => e.spentAt.slice(0, 10) === dateStr
  );

  if (filtered.length === 0)
    return <p>{dateStr} の支出はありません。</p>;

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">項目</th>
          <th className="border p-2">金額</th>
          <th className="border p-2">カテゴリ</th>
        </tr>
      </thead>
      <tbody>
        {filtered.map((exp) => (
          <tr key={exp.id}>
            <td className="border p-2">{exp.title}</td>
            <td className={`border p-2 ${exp.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
              {exp.amount.toLocaleString()} 円
            </td>
            <td className="border p-2">{exp.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
