'use client';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type Props = {
  onDateSelect: (date: Date) => void;
};

export default function KakeiboCalendar({ onDateSelect }: Props) {
  return (
    <div className="border rounded p-2 mb-4">
      <Calendar
        onClickDay={onDateSelect}
        locale="ja-JP"
      />
    </div>
  );
}
