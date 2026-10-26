import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Users, Shield, UserCheck, School, Star, Sparkles } from 'lucide-react';

export const AdminUsers: React.FC = () => {
  const { users, currentUser, setCurrentRole } = useApp();

  const roleBadges = {
    student: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    teacher: 'bg-blue-100 text-blue-800 border-blue-300',
    researcher: 'bg-purple-100 text-purple-800 border-purple-300',
    admin: 'bg-amber-100 text-amber-800 border-amber-300',
    parent: 'bg-rose-100 text-rose-800 border-rose-300'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">👥</span>
            <h1 className="text-2xl font-black text-slate-800">
              Foydalanuvchilar va Rollarni Boshqarish
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Section 2 va 7: O‘quvchilar, o‘qituvchilar, tadqiqotchilar va administratorlar iyerarxiyasi hamda vakolatlari
          </p>
        </div>

        <div className="text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
          Jami faol foydalanuvchilar: <strong>{users.length} nafar</strong>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-extrabold">
                <th className="py-3 px-3">Foydalanuvchi</th>
                <th className="py-3 px-3">Tizim roli</th>
                <th className="py-3 px-3">Sinf / Birikuv</th>
                <th className="py-3 px-3">Muassasa / Maktab</th>
                <th className="py-3 px-3">Yulduzlar (⭐)</th>
                <th className="py-3 px-3">Amal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-base">
                        {u.avatar}
                      </span>
                      <div>
                        <div className="font-extrabold text-slate-800">{u.displayName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">@{u.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase ${
                        roleBadges[u.role]
                      }`}
                    >
                      {u.role === 'student'
                        ? 'O‘quvchi'
                        : u.role === 'teacher'
                        ? 'O‘qituvchi'
                        : u.role === 'researcher'
                        ? 'Tadqiqotchi'
                        : u.role === 'admin'
                        ? 'Administrator'
                        : 'Ota-ona'}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-700">
                    {u.className || 'Umumiy'}
                  </td>
                  <td className="py-3 px-3 text-slate-600">{u.schoolName}</td>
                  <td className="py-3 px-3 font-bold text-amber-700">
                    {u.stars !== undefined ? `${u.stars} ⭐` : '—'}
                  </td>
                  <td className="py-3 px-3">
                    <button
                      onClick={() => setCurrentRole(u.role)}
                      className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 font-bold text-[11px] transition-colors"
                    >
                      Ushbu rolda sinash
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
