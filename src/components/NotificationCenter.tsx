'use client';

import React from 'react';
import { useLorrio } from '../context/LorrioContext';
import { Bell, CheckCheck, Clock, ShieldCheck, Truck, Package } from 'lucide-react';

export const NotificationCenter: React.FC = () => {
  const { notifications, markNotificationRead } = useLorrio();

  return (
    <div className="space-y-4 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-orange-600" />
            <span>Notification Center</span>
          </h2>
          <p className="text-xs text-slate-500">Live order dispatches, driver ETA updates, and quarry notifications</p>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 space-y-2">
          <Bell className="w-8 h-8 text-slate-300 mx-auto" />
          <h3 className="text-sm font-semibold text-slate-600">No notifications yet</h3>
          <p className="text-xs text-slate-400">Notifications will appear when order status or driver ETA updates.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                notif.read
                  ? 'bg-white border-slate-200 opacity-80'
                  : 'bg-orange-50/60 border-orange-200 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {!notif.read && (
                    <span className="w-2 h-2 bg-orange-600 rounded-full" />
                  )}
                  <h4 className="font-bold text-slate-900 text-sm">{notif.title}</h4>
                </div>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {notif.timestamp}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{notif.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
