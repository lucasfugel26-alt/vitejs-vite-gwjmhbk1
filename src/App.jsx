import { useState, useReducer, createContext, useContext } from 'react';
import {
  LayoutDashboard,
  Calendar,
  CalendarPlus,
  Target,
  ShieldAlert,
  ListChecks,
  Gift,
  Archive,
  Settings,
  Compass,
  Layers,
  Check,
  Star,
  ChevronLeft,
  ChevronRight,
  Plus,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Circle,
  RotateCcw,
  CheckSquare,
  Square,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Database,
  RefreshCw,
} from 'lucide-react';

const MONTH_NAMES = [
  '',
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
];
const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const uid = () => Math.random().toString(36).slice(2, 9);
const TODAY = '2026-04-28';
const CAT = {
  sport: { label: 'Sport', bg: '#fee2e2', text: '#b91c1c' },
  gesundheit: { label: 'Gesundheit', bg: '#d1fae5', text: '#065f46' },
  ernaehrung: { label: 'Ernährung', bg: '#fef3c7', text: '#92400e' },
  achtsamkeit: { label: 'Achtsamkeit', bg: '#ede9fe', text: '#5b21b6' },
  produktivitaet: { label: 'Produktivität', bg: '#dbeafe', text: '#1e40af' },
  sonstiges: { label: 'Sonstiges', bg: '#f1f5f9', text: '#475569' },
};
const C = {
  accent: '#d97706',
  accentLight: '#fef3c7',
  accentDark: '#b45309',
  sidebar: '#0f172a',
  sidebarText: '#94a3b8',
  bg: '#f8f7f3',
  card: '#ffffff',
  border: '#e2e8f0',
  text: '#1e293b',
  muted: '#64748b',
  danger: '#ef4444',
  success: '#10b981',
};

// ─── DEMO DATA (vorausgefüllt zum Ausprobieren) ───────────────────────────────
// Alle Daten können in der App bearbeitet oder gelöscht werden.
// Über Einstellungen → Demo-Daten zurücksetzen kannst du alles leeren.
const DEMO = {
  monthPlans: [
    {
      id: 'mp1',
      year: 2026,
      month: 4,
      month_name: 'April',
      status: 'active',
      reflection: '',
      overall_rating: null,
    },
    {
      id: 'mp2',
      year: 2026,
      month: 3,
      month_name: 'März',
      status: 'completed',
      reflection:
        'Ein sehr produktiver Monat. Sportziele fast erreicht, weniger Social Media war spürbar positiv.',
      overall_rating: 4,
    },
  ],
  habitGoals: [
    {
      id: 'h1',
      month_plan_id: 'mp1',
      name: 'Sport / Bewegung',
      description: 'Mind. 30 Min. täglich aktiv',
      target_count: 20,
      current_count: 12,
      category: 'sport',
      completed_dates: [
        '2026-04-01',
        '2026-04-03',
        '2026-04-05',
        '2026-04-07',
        '2026-04-09',
        '2026-04-11',
        '2026-04-14',
        '2026-04-16',
        '2026-04-18',
        '2026-04-21',
        '2026-04-24',
        '2026-04-26',
      ],
    },
    {
      id: 'h2',
      month_plan_id: 'mp1',
      name: 'Meditation',
      description: '10 Min. Achtsamkeit morgens',
      target_count: 25,
      current_count: 18,
      category: 'achtsamkeit',
      completed_dates: [
        '2026-04-01',
        '2026-04-02',
        '2026-04-03',
        '2026-04-05',
        '2026-04-06',
        '2026-04-07',
        '2026-04-08',
        '2026-04-09',
        '2026-04-10',
        '2026-04-12',
        '2026-04-14',
        '2026-04-15',
        '2026-04-17',
        '2026-04-19',
        '2026-04-21',
        '2026-04-23',
        '2026-04-25',
        '2026-04-27',
      ],
    },
    {
      id: 'h3',
      month_plan_id: 'mp1',
      name: 'Lesen',
      description: 'Mind. 20 Seiten täglich',
      target_count: 20,
      current_count: 14,
      category: 'produktivitaet',
      completed_dates: [
        '2026-04-02',
        '2026-04-04',
        '2026-04-06',
        '2026-04-08',
        '2026-04-10',
        '2026-04-12',
        '2026-04-14',
        '2026-04-16',
        '2026-04-18',
        '2026-04-20',
        '2026-04-22',
        '2026-04-24',
        '2026-04-26',
        '2026-04-27',
      ],
    },
    {
      id: 'h4',
      month_plan_id: 'mp1',
      name: '2L Wasser täglich',
      description: 'Hydriert durch den Tag',
      target_count: 28,
      current_count: 21,
      category: 'ernaehrung',
      completed_dates: [
        '2026-04-01',
        '2026-04-02',
        '2026-04-03',
        '2026-04-04',
        '2026-04-05',
        '2026-04-06',
        '2026-04-07',
        '2026-04-09',
        '2026-04-10',
        '2026-04-11',
        '2026-04-12',
        '2026-04-13',
        '2026-04-14',
        '2026-04-15',
        '2026-04-16',
        '2026-04-18',
        '2026-04-20',
        '2026-04-22',
        '2026-04-24',
        '2026-04-25',
        '2026-04-27',
      ],
    },
    {
      id: 'h5',
      month_plan_id: 'mp1',
      name: 'Kein Alkohol',
      description: 'Alkoholfrei durch April',
      target_count: 30,
      current_count: 26,
      category: 'gesundheit',
      completed_dates: [],
    },
  ],
  noGos: [
    {
      id: 'n1',
      month_plan_id: 'mp1',
      name: 'Kein Social Media vor 10 Uhr',
      description: 'Morgen gehört mir',
      violation_count: 3,
      violation_dates: ['2026-04-08', '2026-04-15', '2026-04-22'],
    },
    {
      id: 'n2',
      month_plan_id: 'mp1',
      name: 'Kein Fast Food',
      description: 'Bewusst & gesund essen',
      violation_count: 1,
      violation_dates: ['2026-04-12'],
    },
    {
      id: 'n3',
      month_plan_id: 'mp1',
      name: 'Kein Doom-Scrolling nach 22 Uhr',
      description: 'Handy weg vor dem Schlafen',
      violation_count: 2,
      violation_dates: ['2026-04-05', '2026-04-19'],
    },
  ],
  todos: [
    {
      id: 't1',
      month_plan_id: 'mp1',
      name: 'Steuererklärung einreichen',
      description: 'ELSTER nutzen',
      due_date: '2026-04-30',
      status: 'offen',
      completed_date: null,
      reward_unlocked: false,
    },
    {
      id: 't2',
      month_plan_id: 'mp1',
      name: 'Zahnarzttermin buchen',
      description: 'Halbjährl. Kontrolle',
      due_date: '2026-04-25',
      status: 'erledigt',
      completed_date: '2026-04-20',
      reward_unlocked: true,
    },
    {
      id: 't3',
      month_plan_id: 'mp1',
      name: 'Frühjahrsputz',
      description: 'Alle Zimmer',
      due_date: '2026-04-28',
      status: 'geplant',
      completed_date: null,
      reward_unlocked: false,
    },
    {
      id: 't4',
      month_plan_id: 'mp1',
      name: 'Portfolio aktualisieren',
      description: 'Neue Projekte',
      due_date: '2026-05-01',
      status: 'offen',
      completed_date: null,
      reward_unlocked: false,
    },
    {
      id: 't5',
      month_plan_id: 'mp1',
      name: 'Geburtstagskarte schreiben',
      description: 'Für Oma',
      due_date: '2026-04-29',
      status: 'erledigt',
      completed_date: '2026-04-27',
      reward_unlocked: true,
    },
  ],
  activityGroups: [
    {
      id: 'ag1',
      name: 'Sport & Bewegung',
      description: 'Tägliche Bewegungseinheiten',
      daily_count: 1,
      options: [
        { id: 'ao1', name: 'Yoga (30 Min.)', last_suggested: '2026-04-25' },
        { id: 'ao2', name: 'Joggen im Park', last_suggested: '2026-04-22' },
        { id: 'ao3', name: 'Radfahren', last_suggested: '2026-04-27' },
        { id: 'ao4', name: 'Schwimmen', last_suggested: '2026-04-20' },
        { id: 'ao5', name: 'HIIT Training', last_suggested: '2026-04-18' },
      ],
    },
    {
      id: 'ag2',
      name: 'Kreativität',
      description: 'Kreative Auszeiten täglich',
      daily_count: 1,
      options: [
        { id: 'ao6', name: 'Zeichnen', last_suggested: '2026-04-26' },
        { id: 'ao7', name: 'Tagebuch schreiben', last_suggested: '2026-04-23' },
        { id: 'ao8', name: 'Musik machen', last_suggested: '2026-04-15' },
      ],
    },
  ],
  rewards: [
    {
      id: 'r1',
      name: 'Kinoabend',
      description: 'Film meiner Wahl',
      is_reusable: true,
      times_redeemed: 2,
      is_active: true,
    },
    {
      id: 'r2',
      name: 'Massage (60 Min.)',
      description: 'Entspannungsmassage',
      is_reusable: false,
      times_redeemed: 0,
      is_active: true,
    },
    {
      id: 'r3',
      name: 'Lieblingsrestaurant',
      description: 'Schön essen gehen',
      is_reusable: true,
      times_redeemed: 3,
      is_active: true,
    },
    {
      id: 'r4',
      name: 'Neues Buch',
      description: 'Buch meiner Wahl',
      is_reusable: true,
      times_redeemed: 1,
      is_active: true,
    },
  ],
  redemptions: [
    {
      id: 'rd1',
      reward_id: 'r1',
      reward_name: 'Kinoabend',
      todo_id: 't2',
      todo_name: 'Zahnarzttermin buchen',
      month_plan_id: 'mp1',
      redeemed_date: '2026-04-20',
    },
    {
      id: 'rd2',
      reward_id: 'r3',
      reward_name: 'Lieblingsrestaurant',
      todo_id: 't5',
      todo_name: 'Geburtstagskarte schreiben',
      month_plan_id: 'mp1',
      redeemed_date: '2026-04-27',
    },
  ],
  dayPlans: [
    {
      id: 'dp1',
      month_plan_id: 'mp1',
      date: TODAY,
      is_planned: true,
      is_completed: false,
      planned_tasks: [
        {
          id: 'tk1',
          name: 'Yoga (30 Min.)',
          source: 'activity_group',
          completed: true,
        },
        {
          id: 'tk2',
          name: 'Meditation (10 Min.)',
          source: 'habit',
          completed: true,
        },
        {
          id: 'tk3',
          name: 'Lesen (20 Seiten)',
          source: 'habit',
          completed: false,
        },
        { id: 'tk4', name: 'Frühjahrsputz', source: 'todo', completed: false },
        {
          id: 'tk5',
          name: 'Tagebuch schreiben',
          source: 'custom',
          completed: false,
        },
      ],
      notes: 'Guter Start! Yoga war heute besonders schön.',
      rating: 4,
      no_go_check: true,
    },
  ],
};

const EMPTY = {
  monthPlans: [],
  habitGoals: [],
  noGos: [],
  todos: [],
  activityGroups: [],
  rewards: [],
  redemptions: [],
  dayPlans: [],
};

function reducer(s, a) {
  switch (a.type) {
    case 'RESET_DEMO':
      return { ...DEMO };
    case 'RESET_EMPTY':
      return { ...EMPTY };
    case 'TOGGLE_HABIT':
      return {
        ...s,
        habitGoals: s.habitGoals.map((h) => {
          if (h.id !== a.id) return h;
          const done = h.completed_dates.includes(TODAY);
          return {
            ...h,
            current_count: done ? h.current_count - 1 : h.current_count + 1,
            completed_dates: done
              ? h.completed_dates.filter((d) => d !== TODAY)
              : [...h.completed_dates, TODAY],
          };
        }),
      };
    case 'CREATE_HABIT':
      return {
        ...s,
        habitGoals: [
          ...s.habitGoals,
          { id: uid(), current_count: 0, completed_dates: [], ...a.p },
        ],
      };
    case 'UPDATE_HABIT':
      return {
        ...s,
        habitGoals: s.habitGoals.map((h) =>
          h.id === a.id ? { ...h, ...a.p } : h
        ),
      };
    case 'DELETE_HABIT':
      return { ...s, habitGoals: s.habitGoals.filter((h) => h.id !== a.id) };
    case 'VIOLATE_NOGO':
      return {
        ...s,
        noGos: s.noGos.map((n) =>
          n.id !== a.id
            ? n
            : n.violation_dates.includes(TODAY)
            ? n
            : {
                ...n,
                violation_count: n.violation_count + 1,
                violation_dates: [...n.violation_dates, TODAY],
              }
        ),
      };
    case 'UNDO_NOGO':
      return {
        ...s,
        noGos: s.noGos.map((n) =>
          n.id !== a.id || n.violation_count === 0
            ? n
            : {
                ...n,
                violation_count: n.violation_count - 1,
                violation_dates: n.violation_dates.slice(0, -1),
              }
        ),
      };
    case 'CREATE_NOGO':
      return {
        ...s,
        noGos: [
          ...s.noGos,
          { id: uid(), violation_count: 0, violation_dates: [], ...a.p },
        ],
      };
    case 'UPDATE_NOGO':
      return {
        ...s,
        noGos: s.noGos.map((n) => (n.id === a.id ? { ...n, ...a.p } : n)),
      };
    case 'DELETE_NOGO':
      return { ...s, noGos: s.noGos.filter((n) => n.id !== a.id) };
    case 'CREATE_TODO':
      return {
        ...s,
        todos: [
          ...s.todos,
          {
            id: uid(),
            status: 'offen',
            completed_date: null,
            reward_unlocked: false,
            ...a.p,
          },
        ],
      };
    case 'UPDATE_TODO':
      return {
        ...s,
        todos: s.todos.map((t) => (t.id === a.id ? { ...t, ...a.p } : t)),
      };
    case 'DELETE_TODO':
      return { ...s, todos: s.todos.filter((t) => t.id !== a.id) };
    case 'COMPLETE_TODO':
      return {
        ...s,
        todos: s.todos.map((t) =>
          t.id === a.id
            ? {
                ...t,
                status: 'erledigt',
                completed_date: TODAY,
                reward_unlocked: true,
              }
            : t
        ),
      };
    case 'TOGGLE_TASK':
      return {
        ...s,
        dayPlans: s.dayPlans.map((dp) =>
          dp.id !== a.planId
            ? dp
            : {
                ...dp,
                planned_tasks: dp.planned_tasks.map((t) =>
                  t.id === a.taskId ? { ...t, completed: !t.completed } : t
                ),
              }
        ),
      };
    case 'RENAME_TASK':
      return {
        ...s,
        dayPlans: s.dayPlans.map((dp) =>
          dp.id !== a.planId
            ? dp
            : {
                ...dp,
                planned_tasks: dp.planned_tasks.map((t) =>
                  t.id === a.taskId ? { ...t, name: a.name } : t
                ),
              }
        ),
      };
    case 'ADD_TASK':
      return {
        ...s,
        dayPlans: s.dayPlans.map((dp) =>
          dp.id !== a.planId
            ? dp
            : {
                ...dp,
                planned_tasks: [
                  ...dp.planned_tasks,
                  {
                    id: uid(),
                    name: a.name,
                    source: 'custom',
                    completed: false,
                  },
                ],
              }
        ),
      };
    case 'DELETE_TASK':
      return {
        ...s,
        dayPlans: s.dayPlans.map((dp) =>
          dp.id !== a.planId
            ? dp
            : {
                ...dp,
                planned_tasks: dp.planned_tasks.filter(
                  (t) => t.id !== a.taskId
                ),
              }
        ),
      };
    case 'SET_NOTES':
      return {
        ...s,
        dayPlans: s.dayPlans.map((dp) =>
          dp.id === a.id ? { ...dp, notes: a.v } : dp
        ),
      };
    case 'SET_RATING':
      return {
        ...s,
        dayPlans: s.dayPlans.map((dp) =>
          dp.id === a.id ? { ...dp, rating: a.v } : dp
        ),
      };
    case 'SET_NOGO_CHECK':
      return {
        ...s,
        dayPlans: s.dayPlans.map((dp) =>
          dp.id === a.id ? { ...dp, no_go_check: a.v } : dp
        ),
      };
    case 'COMPLETE_DAY':
      return {
        ...s,
        dayPlans: s.dayPlans.map((dp) =>
          dp.id === a.id ? { ...dp, is_completed: true } : dp
        ),
      };
    case 'CREATE_DAY_PLAN':
      return {
        ...s,
        dayPlans: [
          ...s.dayPlans,
          {
            id: uid(),
            is_planned: true,
            is_completed: false,
            planned_tasks: [],
            notes: '',
            rating: 0,
            no_go_check: true,
            ...a.p,
          },
        ],
      };
    case 'CREATE_REWARD':
      return {
        ...s,
        rewards: [
          ...s.rewards,
          { id: uid(), times_redeemed: 0, is_active: true, ...a.p },
        ],
      };
    case 'UPDATE_REWARD':
      return {
        ...s,
        rewards: s.rewards.map((r) => (r.id === a.id ? { ...r, ...a.p } : r)),
      };
    case 'DELETE_REWARD':
      return { ...s, rewards: s.rewards.filter((r) => r.id !== a.id) };
    case 'REDEEM':
      return {
        ...s,
        rewards: s.rewards.map((r) =>
          r.id === a.rId ? { ...r, times_redeemed: r.times_redeemed + 1 } : r
        ),
        redemptions: [
          ...s.redemptions,
          {
            id: uid(),
            reward_id: a.rId,
            reward_name: a.rName,
            todo_id: a.tId,
            todo_name: a.tName,
            month_plan_id: a.mpId,
            redeemed_date: TODAY,
          },
        ],
      };
    case 'CREATE_MONTH':
      return {
        ...s,
        monthPlans: [
          ...s.monthPlans,
          {
            id: uid(),
            status: 'active',
            reflection: '',
            overall_rating: null,
            ...a.p,
          },
        ],
      };
    case 'UPDATE_MONTH':
      return {
        ...s,
        monthPlans: s.monthPlans.map((m) =>
          m.id === a.id ? { ...m, ...a.p } : m
        ),
      };
    case 'DELETE_MONTH':
      return { ...s, monthPlans: s.monthPlans.filter((m) => m.id !== a.id) };
    case 'CREATE_AG':
      return {
        ...s,
        activityGroups: [
          ...s.activityGroups,
          { id: uid(), options: [], daily_count: 1, ...a.p },
        ],
      };
    case 'UPDATE_AG':
      return {
        ...s,
        activityGroups: s.activityGroups.map((ag) =>
          ag.id === a.id ? { ...ag, ...a.p } : ag
        ),
      };
    case 'DELETE_AG':
      return {
        ...s,
        activityGroups: s.activityGroups.filter((ag) => ag.id !== a.id),
      };
    default:
      return s;
  }
}

const Ctx = createContext(null);
const useApp = () => useContext(Ctx);
const iStyle = {
  width: '100%',
  padding: '8px 12px',
  fontSize: '14px',
  borderRadius: '8px',
  border: `1px solid ${C.border}`,
  outline: 'none',
  color: C.text,
  fontFamily: 'inherit',
  boxSizing: 'border-box',
};

// ─── SHARED UI ────────────────────────────────────────────────────────────────
function Btn({
  children,
  onClick,
  v = 'primary',
  size = 'md',
  disabled = false,
}) {
  const p = { sm: '4px 10px', md: '8px 16px', lg: '10px 20px' };
  const f = { sm: '12px', md: '14px', lg: '14px' };
  const vs = {
    primary: { background: C.accent, color: '#fff', border: 'none' },
    secondary: {
      background: '#fff',
      color: C.text,
      border: `1px solid ${C.border}`,
    },
    danger: { background: C.danger, color: '#fff', border: 'none' },
    ghost: { background: 'transparent', color: C.muted, border: 'none' },
    success: { background: C.success, color: '#fff', border: 'none' },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: p[size],
        fontSize: f[size],
        fontWeight: 500,
        borderRadius: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'inherit',
        opacity: disabled ? 0.5 : 1,
        ...vs[v],
      }}
    >
      {children}
    </button>
  );
}
function Card({ children, style = {}, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: C.card,
        borderRadius: '14px',
        border: `1px solid ${C.border}`,
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        cursor: onClick ? 'pointer' : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
function Badge({ children, color = 'gray' }) {
  const m = {
    gray: ['#f1f5f9', '#475569'],
    amber: ['#fef3c7', '#92400e'],
    green: ['#d1fae5', '#065f46'],
    red: ['#fee2e2', '#b91c1c'],
    blue: ['#dbeafe', '#1e40af'],
    violet: ['#ede9fe', '#5b21b6'],
  };
  const [bg, col] = m[color] || m.gray;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 10px',
        borderRadius: '999px',
        fontSize: '11px',
        fontWeight: 500,
        background: bg,
        color: col,
      }}
    >
      {children}
    </span>
  );
}
function Modal({ open, onClose, title, children, wide = false }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0,0,0,.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: wide ? '560px' : '440px',
          boxShadow: '0 24px 64px rgba(0,0,0,.2)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <span style={{ fontWeight: 600, fontSize: '16px', color: C.text }}>
            {title}
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: C.muted,
              display: 'flex',
              padding: '4px',
            }}
          >
            <X size={16} />
          </button>
        </div>
        <div style={{ padding: '24px' }}>{children}</div>
      </div>
    </div>
  );
}
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      {label && (
        <label
          style={{
            display: 'block',
            fontSize: '13px',
            fontWeight: 500,
            color: C.text,
            marginBottom: '6px',
          }}
        >
          {label}
        </label>
      )}
      {children}
    </div>
  );
}
function ProgBar({ value, max, color }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div
      style={{
        background: '#f1f5f9',
        borderRadius: '999px',
        height: '8px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: '100%',
          borderRadius: '999px',
          background: color || C.accent,
          transition: 'width .4s',
        }}
      />
    </div>
  );
}
function Stars({ value, onChange, size = 18 }) {
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          onClick={() => onChange && onChange(i)}
          style={{
            background: 'none',
            border: 'none',
            cursor: onChange ? 'pointer' : 'default',
            padding: 0,
            display: 'flex',
          }}
        >
          <Star
            size={size}
            fill={i <= value ? '#f59e0b' : 'none'}
            color={i <= value ? '#f59e0b' : '#cbd5e1'}
          />
        </button>
      ))}
    </div>
  );
}
function PageHeader({ title, subtitle, actions }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '24px',
      }}
    >
      <div>
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: C.text,
            margin: 0,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p style={{ margin: '4px 0 0', color: C.muted, fontSize: '14px' }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div style={{ display: 'flex', gap: '8px' }}>{actions}</div>}
    </div>
  );
}
function Empty({ icon: Icon, title, desc }) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 16px', color: C.muted }}>
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '999px',
          background: C.accentLight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px',
        }}
      >
        <Icon size={24} color={C.accent} />
      </div>
      <p style={{ fontWeight: 600, color: C.text, margin: '0 0 4px' }}>
        {title}
      </p>
      <p style={{ fontSize: '14px', margin: 0 }}>{desc}</p>
    </div>
  );
}
function IconBtn({ icon: Icon, onClick, color = C.muted, title = '' }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color,
        display: 'flex',
        padding: '4px',
        borderRadius: '6px',
      }}
    >
      <Icon size={14} />
    </button>
  );
}

// ─── MONAT ABSCHLIESSEN MODAL ─────────────────────────────────────────────────
function MonthCloseModal({ open, onClose, mp, dispatch }) {
  const [refl, setRefl] = useState('');
  const [rating, setRating] = useState(0);
  if (!mp) return null;
  const handle = () => {
    dispatch({
      type: 'UPDATE_MONTH',
      id: mp.id,
      p: { status: 'completed', reflection: refl, overall_rating: rating },
    });
    onClose();
  };
  return (
    <Modal open={open} onClose={onClose} title="🎉 Monatsabschluss">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '999px',
            background: C.accentLight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
          }}
        >
          <Sparkles size={28} color={C.accent} />
        </div>
        <p
          style={{
            margin: '0 0 4px',
            fontSize: '16px',
            fontWeight: 600,
            color: C.text,
          }}
        >
          Du hast den letzten Tag abgeschlossen!
        </p>
        <p style={{ margin: 0, fontSize: '14px', color: C.muted }}>
          {MONTH_NAMES[mp.month]} {mp.year} ist zu Ende. Wie war dein Monat?
        </p>
      </div>
      <Field label="Monatsreflexion">
        <textarea
          value={refl}
          onChange={(e) => setRefl(e.target.value)}
          rows={4}
          placeholder="Was hast du erreicht? Was möchtest du im nächsten Monat anders machen?"
          style={{ ...iStyle, resize: 'vertical' }}
        />
      </Field>
      <Field label="Gesamtbewertung des Monats">
        <Stars value={rating} onChange={setRating} />
      </Field>
      <div
        style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end',
          marginTop: '8px',
        }}
      >
        <Btn v="secondary" onClick={onClose}>
          Später
        </Btn>
        <Btn onClick={handle}>
          <Check size={14} />
          Monat offiziell abschließen
        </Btn>
      </div>
    </Modal>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const NAV = [
  { k: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { k: 'calendar', label: 'Monatskalender', Icon: Calendar },
  { k: 'planday', label: 'Tag planen', Icon: CalendarPlus },
  { k: 'aktivitaeten', label: 'Aktivitäten', Icon: Layers },
  { k: 'habits', label: 'Gewohnheiten', Icon: Target },
  { k: 'nogos', label: 'No-Gos', Icon: ShieldAlert },
  { k: 'todos', label: 'Einmalige To-dos', Icon: ListChecks },
  { k: 'rewards', label: 'Belohnungen', Icon: Gift },
  { k: 'archive', label: 'Archiv', Icon: Archive },
  { k: 'settings', label: 'Einstellungen', Icon: Settings },
];

function Sidebar({ page, navigate }) {
  return (
    <aside
      style={{
        width: '218px',
        minWidth: '218px',
        background: C.sidebar,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          padding: '20px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          borderBottom: '1px solid rgba(255,255,255,.07)',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: C.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Compass size={18} color="#fff" />
        </div>
        <span
          style={{
            fontWeight: 700,
            color: '#f8fafc',
            fontSize: '15px',
            letterSpacing: '-.01em',
          }}
        >
          Monatskompass
        </span>
      </div>
      <nav style={{ flex: 1, padding: '10px 8px' }}>
        {NAV.map(({ k, label, Icon }) => {
          const active = page === k;
          return (
            <button
              key={k}
              onClick={() => navigate(k)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                marginBottom: '2px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '13px',
                fontWeight: active ? 600 : 400,
                textAlign: 'left',
                background: active ? C.accent : 'transparent',
                color: active ? '#fff' : C.sidebarText,
              }}
            >
              <Icon size={15} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>
      <div
        style={{
          padding: '12px',
          borderTop: '1px solid rgba(255,255,255,.07)',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            color: 'rgba(148,163,184,.4)',
            textAlign: 'center',
            margin: 0,
          }}
        >
          Monatskompass v2.0
        </p>
      </div>
    </aside>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard() {
  const { state, navigate } = useApp();
  const mp = state.monthPlans.find((m) => m.status === 'active');
  if (!mp)
    return (
      <div>
        <PageHeader title="Dashboard" />
        <Empty
          icon={Compass}
          title="Noch kein aktiver Monat"
          desc="Erstelle einen Monat unter Einstellungen."
        />
      </div>
    );
  const habits = state.habitGoals.filter((h) => h.month_plan_id === mp.id);
  const noGos = state.noGos.filter((n) => n.month_plan_id === mp.id);
  const todos = state.todos.filter((t) => t.month_plan_id === mp.id);
  const redeem = state.redemptions.filter((r) => r.month_plan_id === mp.id);
  const tp = state.dayPlans.find(
    (d) => d.date === TODAY && d.month_plan_id === mp.id
  );
  const habDone = habits.filter((h) =>
    h.completed_dates.includes(TODAY)
  ).length;
  const todoOpen = todos.filter((t) => t.status !== 'erledigt').length;
  const totalViol = noGos.reduce((s, n) => s + n.violation_count, 0);
  const doneT = tp ? tp.planned_tasks.filter((t) => t.completed).length : 0;
  const totalT = tp ? tp.planned_tasks.length : 0;
  const pct = totalT > 0 ? Math.round((doneT / totalT) * 100) : 0;
  const r = 28,
    circ = 2 * Math.PI * r;
  return (
    <div>
      <PageHeader
        title={`${MONTH_NAMES[mp.month]} ${mp.year}`}
        subtitle="Dein persönlicher Monatskompass"
        actions={
          <Btn onClick={() => navigate('planday')}>
            <CalendarPlus size={14} />
            Tag planen
          </Btn>
        }
      />
      <Card style={{ padding: '24px', marginBottom: '20px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: 600,
                color: C.text,
              }}
            >
              Heute — 28. April 2026
            </h2>
            <p style={{ margin: '2px 0 0', fontSize: '13px', color: C.muted }}>
              Dienstag
            </p>
          </div>
          {tp ? (
            <button
              onClick={() => navigate('dayview', { date: TODAY })}
              style={{
                background: C.accentLight,
                border: 'none',
                borderRadius: '8px',
                padding: '6px 14px',
                fontSize: '13px',
                fontWeight: 500,
                color: C.accent,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Tagesansicht →
            </button>
          ) : (
            <Btn onClick={() => navigate('planday')} size="sm">
              <Plus size={13} />
              Plan erstellen
            </Btn>
          )}
        </div>
        {tp ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div
              style={{
                position: 'relative',
                width: '80px',
                height: '80px',
                flexShrink: 0,
              }}
            >
              <svg
                viewBox="0 0 72 72"
                width="80"
                height="80"
                style={{ transform: 'rotate(-90deg)' }}
              >
                <circle
                  cx="36"
                  cy="36"
                  r={r}
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="8"
                />
                <circle
                  cx="36"
                  cy="36"
                  r={r}
                  fill="none"
                  stroke={C.accent}
                  strokeWidth="8"
                  strokeDasharray={circ}
                  strokeDashoffset={circ * (1 - pct / 100)}
                  strokeLinecap="round"
                />
              </svg>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: C.text,
                }}
              >
                {pct}%
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p
                style={{ margin: '0 0 12px', fontSize: '13px', color: C.muted }}
              >
                {doneT}/{totalT} Aufgaben erledigt
              </p>
              {tp.planned_tasks.slice(0, 5).map((t) => (
                <div
                  key={t.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '6px',
                  }}
                >
                  {t.completed ? (
                    <CheckCircle2 size={15} color={C.success} />
                  ) : (
                    <Circle size={15} color="#cbd5e1" />
                  )}
                  <span
                    style={{
                      fontSize: '13px',
                      color: t.completed ? C.muted : C.text,
                      textDecoration: t.completed ? 'line-through' : 'none',
                    }}
                  >
                    {t.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            style={{ textAlign: 'center', padding: '24px 0', color: C.muted }}
          >
            <CalendarPlus
              size={36}
              color="#cbd5e1"
              style={{ display: 'block', margin: '0 auto 8px' }}
            />
            <p style={{ margin: 0, fontSize: '14px' }}>
              Noch kein Tagesplan — jetzt erstellen!
            </p>
          </div>
        )}
      </Card>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        {[
          {
            label: 'Habits heute',
            val: `${habDone}/${habits.length}`,
            sub: 'erledigt',
            icon: <Target size={18} color={C.accent} />,
            bg: C.accentLight,
          },
          {
            label: 'No-Go Verstöße',
            val: String(totalViol),
            sub: `${noGos.length} Regeln aktiv`,
            icon: <ShieldAlert size={18} color="#ef4444" />,
            bg: '#fee2e2',
          },
          {
            label: 'Offene To-dos',
            val: String(todoOpen),
            sub: `von ${todos.length} gesamt`,
            icon: <ListChecks size={18} color="#3b82f6" />,
            bg: '#dbeafe',
          },
          {
            label: 'Belohnungen',
            val: String(redeem.length),
            sub: 'eingelöst diesen Monat',
            icon: <Gift size={18} color="#8b5cf6" />,
            bg: '#ede9fe',
          },
        ].map((s, i) => (
          <Card key={i} style={{ padding: '18px 20px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p
                  style={{
                    margin: '0 0 6px',
                    fontSize: '12px',
                    color: C.muted,
                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </p>
                <p
                  style={{
                    margin: '0 0 4px',
                    fontSize: '28px',
                    fontWeight: 700,
                    color: C.text,
                    lineHeight: 1,
                  }}
                >
                  {s.val}
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: C.muted }}>
                  {s.sub}
                </p>
              </div>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: s.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {s.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Card style={{ padding: '20px' }}>
        <h3
          style={{
            margin: '0 0 16px',
            fontSize: '15px',
            fontWeight: 600,
            color: C.text,
          }}
        >
          Gewohnheiten — Monatsfortschritt
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {habits.length === 0 ? (
            <p style={{ color: C.muted, fontSize: '14px', margin: 0 }}>
              Keine Gewohnheiten angelegt.
            </p>
          ) : (
            habits.map((h) => {
              const pct = Math.round((h.current_count / h.target_count) * 100);
              const cat = CAT[h.category] || CAT.sonstiges;
              return (
                <div key={h.id}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '13px',
                          fontWeight: 500,
                          color: C.text,
                        }}
                      >
                        {h.name}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          padding: '1px 8px',
                          borderRadius: '999px',
                          background: cat.bg,
                          color: cat.text,
                          fontWeight: 500,
                        }}
                      >
                        {cat.label}
                      </span>
                    </div>
                    <span style={{ fontSize: '13px', color: C.muted }}>
                      {h.current_count}/{h.target_count}
                    </span>
                  </div>
                  <ProgBar
                    value={h.current_count}
                    max={h.target_count}
                    color={
                      pct >= 100 ? C.success : pct >= 60 ? C.accent : '#f97316'
                    }
                  />
                </div>
              );
            })
          )}
        </div>
      </Card>
    </div>
  );
}

// ─── DAY VIEW ────────────────────────────────────────────────────────────────
function DayView({ date: initDate }) {
  const { state, dispatch, navigate } = useApp();
  const [date, setDate] = useState(initDate || TODAY);
  const [newTask, setNewTask] = useState('');
  const [adding, setAdding] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState('');
  const [monthModal, setMonthModal] = useState(false);
  const mp = state.monthPlans.find((m) => m.status === 'active');
  const dp = state.dayPlans.find(
    (d) => d.date === date && d.month_plan_id === mp?.id
  );

  const shift = (n) => {
    const [y, m, d] = date.split('-').map(Number);
    const nd = new Date(y, m - 1, d + n);
    setDate(
      `${nd.getFullYear()}-${String(nd.getMonth() + 1).padStart(
        2,
        '0'
      )}-${String(nd.getDate()).padStart(2, '0')}`
    );
  };
  const fmt = (ds) => {
    const [y, m, d] = ds.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('de-DE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const isLastDayOfMonth = () => {
    const [y, m, d] = date.split('-').map(Number);
    return d === new Date(y, m, 0).getDate();
  };

  const handleCompleteDay = () => {
    if (!dp) return;
    dispatch({ type: 'COMPLETE_DAY', id: dp.id });
    if (isLastDayOfMonth() && mp && mp.status === 'active') {
      setTimeout(() => setMonthModal(true), 400);
    }
  };

  const startEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskName(task.name);
  };
  const saveEdit = () => {
    if (!dp || !editingTaskName.trim()) return;
    dispatch({
      type: 'RENAME_TASK',
      planId: dp.id,
      taskId: editingTaskId,
      name: editingTaskName.trim(),
    });
    setEditingTaskId(null);
  };

  const done = dp ? dp.planned_tasks.filter((t) => t.completed).length : 0;
  const total = dp ? dp.planned_tasks.length : 0;
  const srcLabel = (s) =>
    s === 'habit'
      ? 'Gewohnheit'
      : s === 'todo'
      ? 'To-do'
      : s === 'activity_group'
      ? 'Aktivität'
      : 'Eigene';

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px',
        }}
      >
        <button
          onClick={() => shift(-1)}
          style={{
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: '8px',
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
          }}
        >
          <ChevronLeft size={16} color={C.text} />
        </button>
        <div style={{ flex: 1 }}>
          <h1
            style={{
              margin: 0,
              fontSize: '22px',
              fontWeight: 700,
              color: C.text,
            }}
          >
            {fmt(date)}
          </h1>
          {date === TODAY && (
            <span
              style={{
                fontSize: '12px',
                background: C.accentLight,
                color: C.accent,
                padding: '2px 8px',
                borderRadius: '999px',
                fontWeight: 500,
              }}
            >
              Heute
            </span>
          )}
        </div>
        <button
          onClick={() => shift(1)}
          style={{
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: '8px',
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
          }}
        >
          <ChevronRight size={16} color={C.text} />
        </button>
      </div>

      {!dp ? (
        <Card style={{ padding: '48px', textAlign: 'center' }}>
          <CalendarPlus
            size={40}
            color="#cbd5e1"
            style={{ display: 'block', margin: '0 auto 12px' }}
          />
          <p style={{ color: C.muted, marginBottom: '16px' }}>
            Kein Tagesplan für diesen Tag.
          </p>
          <Btn onClick={() => navigate('planday')}>Jetzt planen</Btn>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Tasks */}
          <Card style={{ padding: '20px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: '15px',
                  fontWeight: 600,
                  color: C.text,
                }}
              >
                Aufgaben — {done}/{total} erledigt
              </h2>
              {!dp.is_completed && (
                <Btn v="ghost" size="sm" onClick={() => setAdding(true)}>
                  <Plus size={13} />
                  Hinzufügen
                </Btn>
              )}
            </div>
            {dp.planned_tasks.length === 0 ? (
              <p
                style={{
                  color: C.muted,
                  fontSize: '14px',
                  textAlign: 'center',
                  padding: '16px 0',
                }}
              >
                Keine Aufgaben geplant.
              </p>
            ) : (
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
              >
                {dp.planned_tasks.map((task) => {
                  const isEditing = editingTaskId === task.id;
                  return (
                    <div
                      key={task.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        background: task.completed ? '#f8fafc' : '#fff',
                        border: `1px solid ${
                          task.completed ? '#e2e8f0' : '#f1f5f9'
                        }`,
                      }}
                    >
                      <button
                        onClick={() =>
                          dispatch({
                            type: 'TOGGLE_TASK',
                            planId: dp.id,
                            taskId: task.id,
                          })
                        }
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 0,
                          display: 'flex',
                          flexShrink: 0,
                        }}
                      >
                        {task.completed ? (
                          <CheckCircle2 size={20} color={C.success} />
                        ) : (
                          <Circle size={20} color="#cbd5e1" />
                        )}
                      </button>
                      {isEditing ? (
                        <input
                          value={editingTaskName}
                          onChange={(e) => setEditingTaskName(e.target.value)}
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEdit();
                            if (e.key === 'Escape') setEditingTaskId(null);
                          }}
                          onBlur={saveEdit}
                          style={{
                            flex: 1,
                            padding: '2px 6px',
                            fontSize: '14px',
                            borderRadius: '4px',
                            border: `1px solid ${C.accent}`,
                            outline: 'none',
                            fontFamily: 'inherit',
                          }}
                        />
                      ) : (
                        <span
                          style={{
                            flex: 1,
                            fontSize: '14px',
                            color: task.completed ? C.muted : C.text,
                            textDecoration: task.completed
                              ? 'line-through'
                              : 'none',
                          }}
                        >
                          {task.name}
                        </span>
                      )}
                      <span
                        style={{
                          fontSize: '11px',
                          padding: '2px 8px',
                          borderRadius: '999px',
                          background: '#f1f5f9',
                          color: C.muted,
                          flexShrink: 0,
                        }}
                      >
                        {srcLabel(task.source)}
                      </span>
                      {!dp.is_completed && (
                        <>
                          <IconBtn
                            icon={Pencil}
                            onClick={() => startEdit(task)}
                            title="Umbenennen"
                          />
                          <IconBtn
                            icon={Trash2}
                            onClick={() =>
                              dispatch({
                                type: 'DELETE_TASK',
                                planId: dp.id,
                                taskId: task.id,
                              })
                            }
                            color="#fca5a5"
                            title="Löschen"
                          />
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {adding && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Neue Aufgabe..."
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newTask.trim()) {
                      dispatch({
                        type: 'ADD_TASK',
                        planId: dp.id,
                        name: newTask.trim(),
                      });
                      setNewTask('');
                      setAdding(false);
                    }
                    if (e.key === 'Escape') {
                      setAdding(false);
                      setNewTask('');
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    border: `1px solid ${C.border}`,
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
                <Btn
                  size="sm"
                  onClick={() => {
                    if (newTask.trim()) {
                      dispatch({
                        type: 'ADD_TASK',
                        planId: dp.id,
                        name: newTask.trim(),
                      });
                      setNewTask('');
                      setAdding(false);
                    }
                  }}
                >
                  OK
                </Btn>
                <Btn
                  size="sm"
                  v="ghost"
                  onClick={() => {
                    setAdding(false);
                    setNewTask('');
                  }}
                >
                  <X size={13} />
                </Btn>
              </div>
            )}
          </Card>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
            }}
          >
            <Card style={{ padding: '20px' }}>
              <h3
                style={{
                  margin: '0 0 12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: C.text,
                }}
              >
                No-Go Check
              </h3>
              <button
                onClick={() =>
                  dispatch({
                    type: 'SET_NOGO_CHECK',
                    id: dp.id,
                    v: !dp.no_go_check,
                  })
                }
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  padding: 0,
                }}
              >
                {dp.no_go_check ? (
                  <CheckSquare size={22} color={C.success} />
                ) : (
                  <Square size={22} color="#ef4444" />
                )}
                <span
                  style={{
                    fontSize: '13px',
                    color: dp.no_go_check ? C.success : '#ef4444',
                    fontWeight: 500,
                  }}
                >
                  {dp.no_go_check ? 'Keine Verstöße ✓' : 'Verstoß aufgetreten'}
                </span>
              </button>
            </Card>
            <Card style={{ padding: '20px' }}>
              <h3
                style={{
                  margin: '0 0 12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: C.text,
                }}
              >
                Tagesbewertung
              </h3>
              <Stars
                value={dp.rating}
                onChange={(v) => dispatch({ type: 'SET_RATING', id: dp.id, v })}
              />
            </Card>
          </div>

          <Card style={{ padding: '20px' }}>
            <h3
              style={{
                margin: '0 0 12px',
                fontSize: '14px',
                fontWeight: 600,
                color: C.text,
              }}
            >
              Notizen
            </h3>
            <textarea
              value={dp.notes}
              onChange={(e) =>
                dispatch({ type: 'SET_NOTES', id: dp.id, v: e.target.value })
              }
              placeholder="Wie war dein Tag? Gedanken, Beobachtungen..."
              rows={4}
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '14px',
                borderRadius: '8px',
                border: `1px solid ${C.border}`,
                outline: 'none',
                fontFamily: 'inherit',
                resize: 'vertical',
                boxSizing: 'border-box',
                color: C.text,
              }}
            />
          </Card>

          {isLastDayOfMonth() && !dp.is_completed && (
            <div
              style={{
                padding: '12px 16px',
                background: '#fef3c7',
                borderRadius: '12px',
                border: `1px solid #fcd34d`,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Sparkles size={16} color={C.accent} />
              <span
                style={{ fontSize: '13px', color: '#92400e', fontWeight: 500 }}
              >
                Das ist der letzte Tag des Monats — beim Abschluss kannst du
                eine Monatsreflexion hinzufügen.
              </span>
            </div>
          )}

          {!dp.is_completed ? (
            <Btn v="success" onClick={handleCompleteDay}>
              <CheckCircle2 size={15} />
              Tag abschließen{isLastDayOfMonth() ? ' & Monat beenden' : ''}
            </Btn>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '12px',
                background: '#d1fae5',
                borderRadius: '12px',
                color: '#065f46',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              ✓ Tag erfolgreich abgeschlossen
            </div>
          )}
        </div>
      )}

      <MonthCloseModal
        open={monthModal}
        onClose={() => setMonthModal(false)}
        mp={mp}
        dispatch={dispatch}
      />
    </div>
  );
}

// ─── HABITS ──────────────────────────────────────────────────────────────────
function Habits() {
  const { state, dispatch } = useApp();
  const mp = state.monthPlans.find((m) => m.status === 'active');
  const habits = state.habitGoals.filter((h) => h.month_plan_id === mp?.id);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    target_count: 15,
    category: 'sonstiges',
  });
  const openCreate = () => {
    setEdit(null);
    setForm({
      name: '',
      description: '',
      target_count: 15,
      category: 'sonstiges',
    });
    setModal(true);
  };
  const openEdit = (h) => {
    setEdit(h);
    setForm({
      name: h.name,
      description: h.description || '',
      target_count: h.target_count,
      category: h.category || 'sonstiges',
    });
    setModal(true);
  };
  const save = () => {
    if (!form.name.trim() || !mp) return;
    edit
      ? dispatch({ type: 'UPDATE_HABIT', id: edit.id, p: form })
      : dispatch({
          type: 'CREATE_HABIT',
          p: { ...form, month_plan_id: mp.id },
        });
    setModal(false);
  };
  return (
    <div>
      <PageHeader
        title="Gewohnheiten"
        subtitle={mp ? `${MONTH_NAMES[mp.month]} ${mp.year}` : ''}
        actions={
          <Btn onClick={openCreate}>
            <Plus size={14} />
            Gewohnheit
          </Btn>
        }
      />
      {habits.length === 0 ? (
        <Empty
          icon={Target}
          title="Noch keine Gewohnheiten"
          desc="Erstelle deine erste monatliche Gewohnheit."
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {habits.map((h) => {
            const pct = Math.round((h.current_count / h.target_count) * 100);
            const doneToday = h.completed_dates.includes(TODAY);
            const cat = CAT[h.category] || CAT.sonstiges;
            let streak = 0;
            for (let i = 0; i < 30; i++) {
              const d = new Date('2026-04-28');
              d.setDate(d.getDate() - i);
              if (h.completed_dates.includes(d.toISOString().split('T')[0]))
                streak++;
              else break;
            }
            return (
              <Card key={h.id} style={{ padding: '20px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: '14px',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '4px',
                      }}
                    >
                      <span style={{ fontWeight: 600, color: C.text }}>
                        {h.name}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          padding: '1px 8px',
                          borderRadius: '999px',
                          background: cat.bg,
                          color: cat.text,
                          fontWeight: 500,
                        }}
                      >
                        {cat.label}
                      </span>
                      {streak >= 3 && (
                        <span
                          style={{
                            fontSize: '12px',
                            color: '#ef4444',
                            fontWeight: 500,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2px',
                          }}
                        >
                          <Flame size={13} />
                          {streak}
                        </span>
                      )}
                    </div>
                    {h.description && (
                      <p
                        style={{ margin: 0, fontSize: '13px', color: C.muted }}
                      >
                        {h.description}
                      </p>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <IconBtn
                      icon={Pencil}
                      onClick={() => openEdit(h)}
                      title="Bearbeiten"
                    />
                    <IconBtn
                      icon={Trash2}
                      onClick={() =>
                        dispatch({ type: 'DELETE_HABIT', id: h.id })
                      }
                      color="#fca5a5"
                      title="Löschen"
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                  }}
                >
                  <span style={{ fontSize: '13px', color: C.muted }}>
                    {h.current_count} von {h.target_count} Tagen
                  </span>
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color:
                        pct >= 100
                          ? C.success
                          : pct >= 50
                          ? C.accent
                          : '#f97316',
                    }}
                  >
                    {pct}%
                  </span>
                </div>
                <ProgBar
                  value={h.current_count}
                  max={h.target_count}
                  color={
                    pct >= 100 ? C.success : pct >= 50 ? C.accent : '#f97316'
                  }
                />
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_HABIT', id: h.id })}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '14px',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 500,
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    background: doneToday ? '#d1fae5' : C.accentLight,
                    color: doneToday ? '#065f46' : C.accent,
                  }}
                >
                  {doneToday ? (
                    <>
                      <CheckCircle2 size={14} />
                      Heute erledigt ✓
                    </>
                  ) : (
                    <>
                      <Circle size={14} />
                      Heute abhaken
                    </>
                  )}
                </button>
              </Card>
            );
          })}
        </div>
      )}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title={edit ? 'Gewohnheit bearbeiten' : 'Neue Gewohnheit'}
      >
        <Field label="Name">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="z.B. 30 Min. Sport"
            style={iStyle}
          />
        </Field>
        <Field label="Beschreibung">
          <input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Optional"
            style={iStyle}
          />
        </Field>
        <Field label="Zieltage im Monat">
          <input
            type="number"
            value={form.target_count}
            onChange={(e) =>
              setForm({ ...form, target_count: +e.target.value })
            }
            style={iStyle}
          />
        </Field>
        <Field label="Kategorie">
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            style={{ ...iStyle, background: '#fff' }}
          >
            {Object.entries(CAT).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </Field>
        <div
          style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}
        >
          <Btn v="secondary" onClick={() => setModal(false)}>
            Abbrechen
          </Btn>
          <Btn onClick={save}>Speichern</Btn>
        </div>
      </Modal>
    </div>
  );
}

// ─── NO-GOS ──────────────────────────────────────────────────────────────────
function NoGos() {
  const { state, dispatch } = useApp();
  const mp = state.monthPlans.find((m) => m.status === 'active');
  const noGos = state.noGos.filter((n) => n.month_plan_id === mp?.id);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ name: '', description: '' });
  const openCreate = () => {
    setEdit(null);
    setForm({ name: '', description: '' });
    setModal(true);
  };
  const openEdit = (n) => {
    setEdit(n);
    setForm({ name: n.name, description: n.description || '' });
    setModal(true);
  };
  const save = () => {
    if (!form.name.trim() || !mp) return;
    edit
      ? dispatch({ type: 'UPDATE_NOGO', id: edit.id, p: form })
      : dispatch({ type: 'CREATE_NOGO', p: { ...form, month_plan_id: mp.id } });
    setModal(false);
  };
  return (
    <div>
      <PageHeader
        title="No-Gos"
        subtitle="Grenzen, die du diesen Monat einhalten möchtest"
        actions={
          <Btn onClick={openCreate}>
            <Plus size={14} />
            No-Go
          </Btn>
        }
      />
      {noGos.length === 0 ? (
        <Empty
          icon={ShieldAlert}
          title="Noch keine No-Gos"
          desc="Definiere Verhaltensweisen, die du diesen Monat vermeidest."
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {noGos.map((n) => {
            const vt = n.violation_dates.includes(TODAY);
            const col =
              n.violation_count === 0
                ? C.success
                : n.violation_count <= 2
                ? C.accent
                : '#ef4444';
            return (
              <Card
                key={n.id}
                style={{ padding: '20px', borderLeft: `4px solid ${col}` }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: '0 0 4px',
                        fontWeight: 600,
                        color: C.text,
                      }}
                    >
                      {n.name}
                    </p>
                    {n.description && (
                      <p
                        style={{ margin: 0, fontSize: '13px', color: C.muted }}
                      >
                        {n.description}
                      </p>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <IconBtn
                      icon={Pencil}
                      onClick={() => openEdit(n)}
                      title="Bearbeiten"
                    />
                    <IconBtn
                      icon={Trash2}
                      onClick={() =>
                        dispatch({ type: 'DELETE_NOGO', id: n.id })
                      }
                      color="#fca5a5"
                      title="Löschen"
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    marginBottom: '12px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <AlertTriangle size={14} color={col} />
                    <span
                      style={{ fontSize: '14px', fontWeight: 600, color: col }}
                    >
                      {n.violation_count} Verstoß
                      {n.violation_count !== 1 ? 'e' : ''}
                    </span>
                  </div>
                  {n.violation_count > 0 && (
                    <span style={{ fontSize: '12px', color: C.muted }}>
                      Zuletzt: {n.violation_dates[n.violation_dates.length - 1]}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => dispatch({ type: 'VIOLATE_NOGO', id: n.id })}
                    disabled={vt}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 500,
                      border: 'none',
                      cursor: vt ? 'not-allowed' : 'pointer',
                      fontFamily: 'inherit',
                      background: vt ? '#f1f5f9' : '#fee2e2',
                      color: vt ? C.muted : '#b91c1c',
                      opacity: vt ? 0.6 : 1,
                    }}
                  >
                    <AlertTriangle size={13} />
                    {vt ? 'Heute vermerkt' : 'Verstoß heute'}
                  </button>
                  {n.violation_count > 0 && (
                    <button
                      onClick={() => dispatch({ type: 'UNDO_NOGO', id: n.id })}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 500,
                        border: `1px solid ${C.border}`,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        background: '#fff',
                        color: C.muted,
                      }}
                    >
                      <RotateCcw size={12} />
                      Rückgängig
                    </button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title={edit ? 'No-Go bearbeiten' : 'Neues No-Go'}
      >
        <Field label="Name">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="z.B. Kein Social Media vor 10 Uhr"
            style={iStyle}
          />
        </Field>
        <Field label="Beschreibung">
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Warum ist das wichtig?"
            rows={2}
            style={{ ...iStyle, resize: 'vertical' }}
          />
        </Field>
        <div
          style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}
        >
          <Btn v="secondary" onClick={() => setModal(false)}>
            Abbrechen
          </Btn>
          <Btn onClick={save}>Speichern</Btn>
        </div>
      </Modal>
    </div>
  );
}

// ─── TODOS ───────────────────────────────────────────────────────────────────
function Todos() {
  const { state, dispatch } = useApp();
  const mp = state.monthPlans.find((m) => m.status === 'active');
  const todos = state.todos.filter((t) => t.month_plan_id === mp?.id);
  const [filter, setFilter] = useState('alle');
  const [modal, setModal] = useState(false);
  const [redeemTodo, setRedeemTodo] = useState(null);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', due_date: '' });
  const openCreate = () => {
    setEdit(null);
    setForm({ name: '', description: '', due_date: '' });
    setModal(true);
  };
  const openEdit = (t) => {
    setEdit(t);
    setForm({
      name: t.name,
      description: t.description || '',
      due_date: t.due_date || '',
    });
    setModal(true);
  };
  const save = () => {
    if (!form.name.trim() || !mp) return;
    edit
      ? dispatch({ type: 'UPDATE_TODO', id: edit.id, p: form })
      : dispatch({ type: 'CREATE_TODO', p: { ...form, month_plan_id: mp.id } });
    setModal(false);
  };
  const complete = (t) => {
    dispatch({ type: 'COMPLETE_TODO', id: t.id });
    setRedeemTodo({ ...t, status: 'erledigt' });
  };
  const filtered = todos.filter(
    (t) => filter === 'alle' || t.status === filter
  );
  const od = (t) => t.due_date && t.status !== 'erledigt' && t.due_date < TODAY;
  const SC = {
    offen: ['#fef3c7', '#92400e'],
    geplant: ['#dbeafe', '#1e40af'],
    erledigt: ['#d1fae5', '#065f46'],
  };
  return (
    <div>
      <PageHeader
        title="Einmalige To-dos"
        subtitle="Aufgaben für diesen Monat"
        actions={
          <Btn onClick={openCreate}>
            <Plus size={14} />
            To-do
          </Btn>
        }
      />
      <div
        style={{
          display: 'flex',
          gap: '6px',
          marginBottom: '20px',
          background: '#f1f5f9',
          borderRadius: '10px',
          padding: '4px',
        }}
      >
        {['alle', 'offen', 'geplant', 'erledigt'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              flex: 1,
              padding: '6px 8px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: filter === f ? 600 : 400,
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              background: filter === f ? '#fff' : 'transparent',
              color: filter === f ? C.text : C.muted,
              boxShadow: filter === f ? '0 1px 3px rgba(0,0,0,.1)' : 'none',
            }}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <Empty
          icon={ListChecks}
          title="Keine To-dos gefunden"
          desc="Erstelle ein To-do oder ändere den Filter."
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map((t) => {
            const [sbg, stxt] = SC[t.status] || SC.offen;
            return (
              <Card key={t.id} style={{ padding: '16px 20px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '12px',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        flexWrap: 'wrap',
                        marginBottom: '4px',
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 600,
                          color: t.status === 'erledigt' ? C.muted : C.text,
                          textDecoration:
                            t.status === 'erledigt' ? 'line-through' : 'none',
                        }}
                      >
                        {t.name}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          padding: '2px 8px',
                          borderRadius: '999px',
                          background: sbg,
                          color: stxt,
                          fontWeight: 500,
                        }}
                      >
                        {t.status[0].toUpperCase() + t.status.slice(1)}
                      </span>
                      {t.reward_unlocked && (
                        <span
                          style={{
                            fontSize: '11px',
                            padding: '2px 8px',
                            borderRadius: '999px',
                            background: '#ede9fe',
                            color: '#5b21b6',
                            fontWeight: 500,
                          }}
                        >
                          🎁 Belohnung
                        </span>
                      )}
                    </div>
                    {t.description && (
                      <p
                        style={{
                          margin: '0 0 6px',
                          fontSize: '13px',
                          color: C.muted,
                        }}
                      >
                        {t.description}
                      </p>
                    )}
                    {t.due_date && (
                      <span
                        style={{
                          fontSize: '12px',
                          color: od(t) ? '#ef4444' : C.muted,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <Clock size={11} />
                        Fällig: {t.due_date}
                        {od(t) ? ' — ÜBERFÄLLIG' : ''}
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: '4px',
                      flexShrink: 0,
                      alignItems: 'center',
                    }}
                  >
                    {t.status !== 'erledigt' && (
                      <button
                        onClick={() => complete(t)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          background: '#d1fae5',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '5px 10px',
                          cursor: 'pointer',
                          color: '#065f46',
                          fontSize: '12px',
                          fontWeight: 500,
                          fontFamily: 'inherit',
                        }}
                      >
                        <Check size={12} />
                        Erledigt
                      </button>
                    )}
                    <IconBtn
                      icon={Pencil}
                      onClick={() => openEdit(t)}
                      title="Bearbeiten"
                    />
                    <IconBtn
                      icon={Trash2}
                      onClick={() =>
                        dispatch({ type: 'DELETE_TODO', id: t.id })
                      }
                      color="#fca5a5"
                      title="Löschen"
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title={edit ? 'To-do bearbeiten' : 'Neues To-do'}
      >
        <Field label="Name">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Was möchtest du erledigen?"
            style={iStyle}
          />
        </Field>
        <Field label="Beschreibung">
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Optional"
            rows={2}
            style={{ ...iStyle, resize: 'vertical' }}
          />
        </Field>
        <Field label="Fälligkeitsdatum">
          <input
            type="date"
            value={form.due_date}
            onChange={(e) => setForm({ ...form, due_date: e.target.value })}
            style={iStyle}
          />
        </Field>
        <div
          style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}
        >
          <Btn v="secondary" onClick={() => setModal(false)}>
            Abbrechen
          </Btn>
          <Btn onClick={save}>Speichern</Btn>
        </div>
      </Modal>
      <Modal
        open={!!redeemTodo}
        onClose={() => setRedeemTodo(null)}
        title="🎉 Erledigt! Belohnung wählen?"
      >
        <p style={{ color: C.muted, fontSize: '14px', marginTop: 0 }}>
          Du hast <strong>„{redeemTodo?.name}"</strong> abgeschlossen!
        </p>
        {state.rewards
          .filter(
            (r) => r.is_active && (r.is_reusable || r.times_redeemed === 0)
          )
          .map((r) => (
            <button
              key={r.id}
              onClick={() => {
                if (redeemTodo && mp)
                  dispatch({
                    type: 'REDEEM',
                    rId: r.id,
                    rName: r.name,
                    tId: redeemTodo.id,
                    tName: redeemTodo.name,
                    mpId: mp.id,
                  });
                setRedeemTodo(null);
              }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '12px',
                borderRadius: '10px',
                border: `1px solid ${C.border}`,
                background: '#fff',
                cursor: 'pointer',
                fontFamily: 'inherit',
                marginBottom: '8px',
              }}
            >
              <p
                style={{
                  margin: '0 0 2px',
                  fontWeight: 500,
                  fontSize: '14px',
                  color: C.text,
                }}
              >
                {r.name}
              </p>
              <p style={{ margin: 0, fontSize: '12px', color: C.muted }}>
                {r.description}
              </p>
            </button>
          ))}
        <Btn v="secondary" onClick={() => setRedeemTodo(null)}>
          Später einlösen
        </Btn>
      </Modal>
    </div>
  );
}

// ─── REWARDS ─────────────────────────────────────────────────────────────────
function Rewards() {
  const { state, dispatch } = useApp();
  const mp = state.monthPlans.find((m) => m.status === 'active');
  const redeem = state.redemptions.filter((r) => r.month_plan_id === mp?.id);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    is_reusable: true,
  });
  const openCreate = () => {
    setEdit(null);
    setForm({ name: '', description: '', is_reusable: true });
    setModal(true);
  };
  const openEdit = (r) => {
    setEdit(r);
    setForm({
      name: r.name,
      description: r.description || '',
      is_reusable: r.is_reusable,
    });
    setModal(true);
  };
  const save = () => {
    if (!form.name.trim()) return;
    edit
      ? dispatch({ type: 'UPDATE_REWARD', id: edit.id, p: form })
      : dispatch({ type: 'CREATE_REWARD', p: form });
    setModal(false);
  };
  return (
    <div>
      <PageHeader
        title="Belohnungen"
        subtitle="Motivation durch Selbstfürsorge"
        actions={
          <Btn onClick={openCreate}>
            <Plus size={14} />
            Belohnung
          </Btn>
        }
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        {state.rewards.map((r) => (
          <Card key={r.id} style={{ padding: '18px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
              }}
            >
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: C.accentLight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Gift size={14} color={C.accent} />
                </div>
                <span
                  style={{ fontWeight: 600, fontSize: '14px', color: C.text }}
                >
                  {r.name}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <IconBtn
                  icon={Pencil}
                  onClick={() => openEdit(r)}
                  title="Bearbeiten"
                />
                <IconBtn
                  icon={Trash2}
                  onClick={() => dispatch({ type: 'DELETE_REWARD', id: r.id })}
                  color="#fca5a5"
                  title="Löschen"
                />
              </div>
            </div>
            {r.description && (
              <p
                style={{ margin: '0 0 8px', fontSize: '13px', color: C.muted }}
              >
                {r.description}
              </p>
            )}
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge color={r.is_reusable ? 'blue' : 'gray'}>
                {r.is_reusable ? 'Mehrfach' : 'Einmalig'}
              </Badge>
              <Badge color="amber">{r.times_redeemed}× eingelöst</Badge>
            </div>
          </Card>
        ))}
      </div>
      {redeem.length > 0 && (
        <Card style={{ padding: '20px' }}>
          <h3
            style={{
              margin: '0 0 16px',
              fontSize: '15px',
              fontWeight: 600,
              color: C.text,
            }}
          >
            Einlösungen diesen Monat
          </h3>
          {redeem.map((rd) => (
            <div
              key={rd.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: '#f8fafc',
                borderRadius: '10px',
                marginBottom: '8px',
              }}
            >
              <div>
                <span
                  style={{ fontSize: '14px', fontWeight: 500, color: C.text }}
                >
                  {rd.reward_name}
                </span>
                <span style={{ fontSize: '13px', color: C.muted }}>
                  {' '}
                  für „{rd.todo_name}"
                </span>
              </div>
              <span style={{ fontSize: '12px', color: C.muted }}>
                {rd.redeemed_date}
              </span>
            </div>
          ))}
        </Card>
      )}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title={edit ? 'Belohnung bearbeiten' : 'Neue Belohnung'}
      >
        <Field label="Name">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="z.B. Kinoabend"
            style={iStyle}
          />
        </Field>
        <Field label="Beschreibung">
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Was ist die Belohnung?"
            rows={2}
            style={{ ...iStyle, resize: 'vertical' }}
          />
        </Field>
        <Field label="">
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
            }}
          >
            <input
              type="checkbox"
              checked={form.is_reusable}
              onChange={(e) =>
                setForm({ ...form, is_reusable: e.target.checked })
              }
            />
            <span style={{ fontSize: '14px', color: C.text }}>
              Mehrfach nutzbar
            </span>
          </label>
        </Field>
        <div
          style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}
        >
          <Btn v="secondary" onClick={() => setModal(false)}>
            Abbrechen
          </Btn>
          <Btn onClick={save}>Speichern</Btn>
        </div>
      </Modal>
    </div>
  );
}

// ─── PLAN DAY ────────────────────────────────────────────────────────────────
function PlanDay() {
  const { state, dispatch, navigate } = useApp();
  const mp = state.monthPlans.find((m) => m.status === 'active');
  const [step, setStep] = useState(1);
  const [selH, setSelH] = useState([]);
  const [selA, setSelA] = useState([]);
  const [customs, setCustoms] = useState([]);
  const [newC, setNewC] = useState('');
  const habits = state.habitGoals.filter((h) => h.month_plan_id === mp?.id);
  const suggested = state.activityGroups.flatMap((ag) => {
    const sorted = [...ag.options].sort((a, b) =>
      (a.last_suggested || '') < (b.last_suggested || '') ? -1 : 1
    );
    return sorted
      .slice(0, ag.daily_count)
      .map((o) => ({ id: o.id, name: o.name, group: ag.name }));
  });
  const finish = () => {
    if (!mp) return;
    const tasks = [
      ...selH.map((h) => ({
        id: uid(),
        name: h.name,
        source: 'habit',
        completed: false,
      })),
      ...selA.map((a) => ({
        id: uid(),
        name: a.name,
        source: 'activity_group',
        completed: false,
      })),
      ...customs.map((n) => ({
        id: uid(),
        name: n,
        source: 'custom',
        completed: false,
      })),
    ];
    dispatch({
      type: 'CREATE_DAY_PLAN',
      p: { month_plan_id: mp.id, date: TODAY, planned_tasks: tasks },
    });
    navigate('dayview', { date: TODAY });
  };
  const STEPS = ['Gewohnheiten', 'Aktivitäten', 'Eigene Tasks', 'Fertig'];
  const tot = selH.length + selA.length + customs.length;
  return (
    <div>
      <PageHeader
        title="Tag planen"
        subtitle="Plane deinen Tag mit Intention — 28. April 2026"
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '32px',
        }}
      >
        {STEPS.map((s, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              flex: i < STEPS.length - 1 ? 'auto' : undefined,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: i + 1 <= step ? C.accent : '#f1f5f9',
                  color: i + 1 <= step ? '#fff' : C.muted,
                }}
              >
                {i + 1 <= step && i + 1 < step ? <Check size={14} /> : i + 1}
              </div>
              <span
                style={{
                  fontSize: '12px',
                  color: i + 1 === step ? C.text : C.muted,
                  fontWeight: i + 1 === step ? 600 : 400,
                }}
              >
                {s}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: '1px',
                  background: C.border,
                  margin: '0 8px',
                }}
              />
            )}
          </div>
        ))}
      </div>
      <Card style={{ padding: '24px' }}>
        {step === 1 && (
          <div>
            <h2
              style={{
                margin: '0 0 4px',
                fontSize: '16px',
                fontWeight: 600,
                color: C.text,
              }}
            >
              Welche Gewohnheiten heute?
            </h2>
            <p style={{ margin: '0 0 20px', fontSize: '13px', color: C.muted }}>
              Wähle die Gewohnheiten für heute aus.
            </p>
            {habits.length === 0 ? (
              <p style={{ color: C.muted }}>Keine Gewohnheiten definiert.</p>
            ) : (
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
              >
                {habits.map((h) => {
                  const sel = selH.some((s) => s.id === h.id);
                  return (
                    <button
                      key={h.id}
                      onClick={() =>
                        setSelH(
                          sel ? selH.filter((s) => s.id !== h.id) : [...selH, h]
                        )
                      }
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: `2px solid ${sel ? C.accent : C.border}`,
                        background: sel ? C.accentLight : '#fff',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        textAlign: 'left',
                      }}
                    >
                      {sel ? (
                        <CheckSquare size={18} color={C.accent} />
                      ) : (
                        <Square size={18} color="#cbd5e1" />
                      )}
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: '14px',
                            fontWeight: 500,
                            color: C.text,
                          }}
                        >
                          {h.name}
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: '12px',
                            color: C.muted,
                          }}
                        >
                          {h.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
        {step === 2 && (
          <div>
            <h2
              style={{
                margin: '0 0 4px',
                fontSize: '16px',
                fontWeight: 600,
                color: C.text,
              }}
            >
              Vorgeschlagene Aktivitäten
            </h2>
            <p style={{ margin: '0 0 20px', fontSize: '13px', color: C.muted }}>
              Zufallsauswahl basierend auf deinen Gruppen.
            </p>
            {suggested.length === 0 ? (
              <p style={{ color: C.muted }}>
                Keine Aktivitätsgruppen angelegt.
              </p>
            ) : (
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
              >
                {suggested.map((a) => {
                  const sel = selA.some((s) => s.id === a.id);
                  return (
                    <button
                      key={a.id}
                      onClick={() =>
                        setSelA(
                          sel ? selA.filter((s) => s.id !== a.id) : [...selA, a]
                        )
                      }
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: `2px solid ${sel ? C.accent : C.border}`,
                        background: sel ? C.accentLight : '#fff',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        textAlign: 'left',
                      }}
                    >
                      {sel ? (
                        <CheckSquare size={18} color={C.accent} />
                      ) : (
                        <Square size={18} color="#cbd5e1" />
                      )}
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: '14px',
                            fontWeight: 500,
                            color: C.text,
                          }}
                        >
                          {a.name}
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: '12px',
                            color: C.muted,
                          }}
                        >
                          {a.group}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
        {step === 3 && (
          <div>
            <h2
              style={{
                margin: '0 0 4px',
                fontSize: '16px',
                fontWeight: 600,
                color: C.text,
              }}
            >
              Eigene Aufgaben
            </h2>
            <p style={{ margin: '0 0 20px', fontSize: '13px', color: C.muted }}>
              Was steht sonst noch heute an?
            </p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input
                value={newC}
                onChange={(e) => setNewC(e.target.value)}
                placeholder="Aufgabe eingeben..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newC.trim()) {
                    setCustoms([...customs, newC.trim()]);
                    setNewC('');
                  }
                }}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  fontSize: '14px',
                  borderRadius: '8px',
                  border: `1px solid ${C.border}`,
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
              <Btn
                size="sm"
                onClick={() => {
                  if (newC.trim()) {
                    setCustoms([...customs, newC.trim()]);
                    setNewC('');
                  }
                }}
              >
                <Plus size={13} />
              </Btn>
            </div>
            {customs.map((c, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  background: '#f8fafc',
                  borderRadius: '8px',
                  marginBottom: '6px',
                }}
              >
                <Check size={13} color={C.success} />
                <span style={{ flex: 1, fontSize: '14px', color: C.text }}>
                  {c}
                </span>
                <button
                  onClick={() => setCustoms(customs.filter((_, j) => j !== i))}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#fca5a5',
                    display: 'flex',
                  }}
                >
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>
        )}
        {step === 4 && (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '999px',
                background: C.accentLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <Sparkles size={28} color={C.accent} />
            </div>
            <h2 style={{ margin: '0 0 8px', color: C.text }}>
              Bereit für den Tag!
            </h2>
            <p
              style={{ color: C.muted, fontSize: '14px', marginBottom: '24px' }}
            >
              {tot} Aufgaben: {selH.length} Gewohnheiten, {selA.length}{' '}
              Aktivitäten, {customs.length} eigene.
            </p>
            {tot > 0 ? (
              <Btn onClick={finish}>
                <CheckCircle2 size={14} />
                Plan erstellen & starten
              </Btn>
            ) : (
              <p style={{ color: C.muted }}>
                Füge mindestens eine Aufgabe hinzu.
              </p>
            )}
          </div>
        )}
      </Card>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px',
        }}
      >
        <div>
          {step > 1 && (
            <Btn v="secondary" onClick={() => setStep((s) => s - 1)}>
              <ChevronLeft size={14} />
              Zurück
            </Btn>
          )}
        </div>
        {step < 4 && (
          <Btn onClick={() => setStep((s) => s + 1)}>
            Weiter
            <ChevronRight size={14} />
          </Btn>
        )}
      </div>
    </div>
  );
}

// ─── CALENDAR ────────────────────────────────────────────────────────────────
function MonthCalendar() {
  const { state, navigate } = useApp();
  const mp = state.monthPlans.find((m) => m.status === 'active');
  if (!mp)
    return (
      <Empty
        icon={Calendar}
        title="Kein aktiver Monat"
        desc="Erstelle einen Monat in den Einstellungen."
      />
    );
  const dps = state.dayPlans.filter((d) => d.month_plan_id === mp.id);
  const { year, month } = mp;
  const dim = new Date(year, month, 0).getDate();
  let sdow = new Date(year, month - 1, 1).getDay();
  sdow = sdow === 0 ? 6 : sdow - 1;
  const cells = [];
  for (let i = 0; i < sdow; i++) cells.push(null);
  for (let d = 1; d <= dim; d++) cells.push(d);
  return (
    <div>
      <PageHeader
        title={`${MONTH_NAMES[month]} ${year}`}
        subtitle="Monatsübersicht"
      />
      <Card style={{ padding: '20px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7,1fr)',
            gap: '4px',
            marginBottom: '8px',
          }}
        >
          {WEEKDAYS.map((d) => (
            <div
              key={d}
              style={{
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: 600,
                color: C.muted,
                padding: '6px 0',
              }}
            >
              {d}
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7,1fr)',
            gap: '6px',
          }}
        >
          {cells.map((day, i) => {
            if (!day) return <div key={i} />;
            const ds = `${year}-${String(month).padStart(2, '0')}-${String(
              day
            ).padStart(2, '0')}`;
            const dp = dps.find((d) => d.date === ds);
            const isT = ds === TODAY;
            const isPast = ds < TODAY;
            return (
              <button
                key={i}
                onClick={() => navigate('dayview', { date: ds })}
                style={{
                  paddingTop: '100%',
                  position: 'relative',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  background: isT
                    ? C.accent
                    : dp?.is_completed
                    ? '#d1fae5'
                    : dp?.is_planned
                    ? '#dbeafe'
                    : isPast
                    ? '#f8fafc'
                    : '#fff',
                  outline: isT
                    ? `2px solid ${C.accentDark}`
                    : `1px solid ${C.border}`,
                  outlineOffset: isT ? '1px' : '-0.5px',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: isT ? 700 : 500,
                      color: isT
                        ? '#fff'
                        : dp?.is_completed
                        ? '#065f46'
                        : C.text,
                    }}
                  >
                    {day}
                  </span>
                  {dp?.rating > 0 && (
                    <div style={{ display: 'flex', gap: '1px' }}>
                      {Array.from({ length: dp.rating }).map((_, si) => (
                        <div
                          key={si}
                          style={{
                            width: '4px',
                            height: '4px',
                            borderRadius: '999px',
                            background: isT
                              ? 'rgba(255,255,255,.7)'
                              : '#f59e0b',
                          }}
                        />
                      ))}
                    </div>
                  )}
                </span>
              </button>
            );
          })}
        </div>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '16px',
            flexWrap: 'wrap',
          }}
        >
          {[
            ['Heute', C.accent],
            ['Abgeschlossen', '#d1fae5'],
            ['Geplant', '#dbeafe'],
          ].map(([l, bg]) => (
            <div
              key={l}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '3px',
                  background: bg,
                  border: `1px solid ${C.border}`,
                }}
              />
              <span style={{ fontSize: '12px', color: C.muted }}>{l}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── AKTIVITÄTEN ─────────────────────────────────────────────────────────────
function Aktivitaeten() {
  const { state, dispatch } = useApp();
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    daily_count: 1,
  });
  const [newOpt, setNewOpt] = useState({});
  const openCreate = () => {
    setEdit(null);
    setForm({ name: '', description: '', daily_count: 1 });
    setModal(true);
  };
  const openEdit = (ag) => {
    setEdit(ag);
    setForm({
      name: ag.name,
      description: ag.description || '',
      daily_count: ag.daily_count,
    });
    setModal(true);
  };
  const save = () => {
    if (!form.name.trim()) return;
    edit
      ? dispatch({ type: 'UPDATE_AG', id: edit.id, p: form })
      : dispatch({ type: 'CREATE_AG', p: form });
    setModal(false);
  };
  const addOpt = (agId) => {
    const name = (newOpt[agId] || '').trim();
    if (!name) return;
    const ag = state.activityGroups.find((a) => a.id === agId);
    dispatch({
      type: 'UPDATE_AG',
      id: agId,
      p: { options: [...ag.options, { id: uid(), name, last_suggested: '' }] },
    });
    setNewOpt({ ...newOpt, [agId]: '' });
  };
  const rmOpt = (agId, optId) => {
    const ag = state.activityGroups.find((a) => a.id === agId);
    dispatch({
      type: 'UPDATE_AG',
      id: agId,
      p: { options: ag.options.filter((o) => o.id !== optId) },
    });
  };
  return (
    <div>
      <PageHeader
        title="Aktivitäten"
        subtitle="Zufällige Auswahl für die Tagesplanung"
        actions={
          <Btn onClick={openCreate}>
            <Plus size={14} />
            Gruppe
          </Btn>
        }
      />
      {state.activityGroups.length === 0 ? (
        <Empty
          icon={Layers}
          title="Noch keine Aktivitätsgruppen"
          desc="Erstelle Gruppen mit Aktivitäten für die Tagesplanung."
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {state.activityGroups.map((ag) => (
            <Card key={ag.id} style={{ overflow: 'hidden' }}>
              <div
                style={{
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span style={{ fontWeight: 600, color: C.text }}>
                      {ag.name}
                    </span>
                    <Badge color="amber">
                      {ag.daily_count}×/Tag · {ag.options.length} Optionen
                    </Badge>
                  </div>
                  {ag.description && (
                    <p
                      style={{
                        margin: '4px 0 0',
                        fontSize: '13px',
                        color: C.muted,
                      }}
                    >
                      {ag.description}
                    </p>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <IconBtn
                    icon={Pencil}
                    onClick={() => openEdit(ag)}
                    title="Bearbeiten"
                  />
                  <IconBtn
                    icon={Trash2}
                    onClick={() => dispatch({ type: 'DELETE_AG', id: ag.id })}
                    color="#fca5a5"
                    title="Löschen"
                  />
                  <button
                    onClick={() =>
                      setExpanded(expanded === ag.id ? null : ag.id)
                    }
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: C.muted,
                      display: 'flex',
                      padding: '4px',
                    }}
                  >
                    {expanded === ag.id ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                </div>
              </div>
              {expanded === ag.id && (
                <div
                  style={{
                    borderTop: `1px solid ${C.border}`,
                    padding: '16px 20px',
                    background: '#f8fafc',
                  }}
                >
                  {ag.options.map((opt) => (
                    <div
                      key={opt.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 0',
                        borderBottom: `1px solid ${C.border}`,
                      }}
                    >
                      <div
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '999px',
                          background: C.accent,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{ flex: 1, fontSize: '13px', color: C.text }}
                      >
                        {opt.name}
                      </span>
                      {opt.last_suggested && (
                        <span style={{ fontSize: '11px', color: C.muted }}>
                          zuletzt: {opt.last_suggested}
                        </span>
                      )}
                      <IconBtn
                        icon={X}
                        onClick={() => rmOpt(ag.id, opt.id)}
                        color="#fca5a5"
                        title="Entfernen"
                      />
                    </div>
                  ))}
                  <div
                    style={{ display: 'flex', gap: '8px', marginTop: '12px' }}
                  >
                    <input
                      value={newOpt[ag.id] || ''}
                      onChange={(e) =>
                        setNewOpt({ ...newOpt, [ag.id]: e.target.value })
                      }
                      placeholder="Neue Option..."
                      onKeyDown={(e) => e.key === 'Enter' && addOpt(ag.id)}
                      style={{
                        flex: 1,
                        padding: '6px 10px',
                        fontSize: '13px',
                        borderRadius: '6px',
                        border: `1px solid ${C.border}`,
                        outline: 'none',
                        fontFamily: 'inherit',
                      }}
                    />
                    <Btn size="sm" onClick={() => addOpt(ag.id)}>
                      <Plus size={13} />
                    </Btn>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title={edit ? 'Gruppe bearbeiten' : 'Neue Aktivitätsgruppe'}
      >
        <Field label="Name">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="z.B. Sport & Bewegung"
            style={iStyle}
          />
        </Field>
        <Field label="Beschreibung">
          <input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Optional"
            style={iStyle}
          />
        </Field>
        <Field label="Aktivitäten pro Tag">
          <input
            type="number"
            min={1}
            value={form.daily_count}
            onChange={(e) => setForm({ ...form, daily_count: +e.target.value })}
            style={iStyle}
          />
        </Field>
        <div
          style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}
        >
          <Btn v="secondary" onClick={() => setModal(false)}>
            Abbrechen
          </Btn>
          <Btn onClick={save}>Speichern</Btn>
        </div>
      </Modal>
    </div>
  );
}

// ─── ARCHIVE ─────────────────────────────────────────────────────────────────
function ArchivePage() {
  const { state, dispatch } = useApp();
  const archived = state.monthPlans.filter((m) => m.status !== 'active');
  const [expanded, setExpanded] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [refl, setRefl] = useState('');
  const [rating, setRating] = useState(0);
  const openEdit = (m) => {
    setEditModal(m);
    setRefl(m.reflection || '');
    setRating(m.overall_rating || 0);
  };
  return (
    <div>
      <PageHeader title="Archiv" subtitle="Abgeschlossene Monate" />
      {archived.length === 0 ? (
        <Empty
          icon={Archive}
          title="Noch kein Archiv"
          desc="Abgeschlossene Monate erscheinen hier."
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {archived.map((m) => {
            const habits = state.habitGoals.filter(
              (h) => h.month_plan_id === m.id
            );
            const avg =
              habits.length > 0
                ? Math.round(
                    habits.reduce(
                      (s, h) => s + (h.current_count / h.target_count) * 100,
                      0
                    ) / habits.length
                  )
                : 0;
            return (
              <Card key={m.id} style={{ overflow: 'hidden' }}>
                <div
                  onClick={() => setExpanded(expanded === m.id ? null : m.id)}
                  style={{
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                    >
                      <span style={{ fontWeight: 600, color: C.text }}>
                        {MONTH_NAMES[m.month]} {m.year}
                      </span>
                      {m.overall_rating && (
                        <Stars value={m.overall_rating} size={14} />
                      )}
                    </div>
                    <p
                      style={{
                        margin: '4px 0 0',
                        fontSize: '13px',
                        color: C.muted,
                      }}
                    >
                      {habits.length} Gewohnheiten · Ø {avg}% erreicht
                    </p>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: '4px',
                      alignItems: 'center',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <IconBtn
                      icon={Pencil}
                      onClick={() => openEdit(m)}
                      title="Reflexion bearbeiten"
                    />
                    <IconBtn
                      icon={Trash2}
                      onClick={() =>
                        dispatch({ type: 'DELETE_MONTH', id: m.id })
                      }
                      color="#fca5a5"
                      title="Monat löschen"
                    />
                    <button
                      onClick={() =>
                        setExpanded(expanded === m.id ? null : m.id)
                      }
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: C.muted,
                        display: 'flex',
                        padding: '4px',
                      }}
                    >
                      {expanded === m.id ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  </div>
                </div>
                {expanded === m.id && (
                  <div
                    style={{
                      borderTop: `1px solid ${C.border}`,
                      padding: '18px 20px',
                      background: '#f8fafc',
                    }}
                  >
                    {m.reflection && (
                      <div
                        style={{
                          marginBottom: '16px',
                          padding: '14px',
                          background: '#fff',
                          borderRadius: '10px',
                          borderLeft: `3px solid ${C.accent}`,
                        }}
                      >
                        <p
                          style={{
                            margin: '0 0 4px',
                            fontSize: '11px',
                            fontWeight: 600,
                            color: C.accent,
                          }}
                        >
                          REFLEXION
                        </p>
                        <p
                          style={{ margin: 0, fontSize: '14px', color: C.text }}
                        >
                          {m.reflection}
                        </p>
                      </div>
                    )}
                    {habits.map((h) => (
                      <div key={h.id} style={{ marginBottom: '10px' }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '4px',
                          }}
                        >
                          <span style={{ fontSize: '13px', color: C.text }}>
                            {h.name}
                          </span>
                          <span style={{ fontSize: '13px', color: C.muted }}>
                            {h.current_count}/{h.target_count}
                          </span>
                        </div>
                        <ProgBar value={h.current_count} max={h.target_count} />
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
      <Modal
        open={!!editModal}
        onClose={() => setEditModal(null)}
        title="Reflexion bearbeiten"
      >
        <Field label="Monatsreflexion">
          <textarea
            value={refl}
            onChange={(e) => setRefl(e.target.value)}
            rows={4}
            style={{ ...iStyle, resize: 'vertical' }}
          />
        </Field>
        <Field label="Gesamtbewertung">
          <Stars value={rating} onChange={setRating} />
        </Field>
        <div
          style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}
        >
          <Btn v="secondary" onClick={() => setEditModal(null)}>
            Abbrechen
          </Btn>
          <Btn
            onClick={() => {
              dispatch({
                type: 'UPDATE_MONTH',
                id: editModal.id,
                p: { reflection: refl, overall_rating: rating },
              });
              setEditModal(null);
            }}
          >
            Speichern
          </Btn>
        </div>
      </Modal>
    </div>
  );
}

// ─── SETTINGS ────────────────────────────────────────────────────────────────
function SettingsPage() {
  const { state, dispatch } = useApp();
  const mp = state.monthPlans.find((m) => m.status === 'active');
  const [newM, setNewM] = useState({ year: 2026, month: 5 });

  return (
    <div>
      <PageHeader title="Einstellungen" />

      {/* Demo Data Info */}
      <Card
        style={{
          padding: '20px',
          marginBottom: '20px',
          borderLeft: `4px solid ${C.accent}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: C.accentLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Database size={16} color={C.accent} />
          </div>
          <div style={{ flex: 1 }}>
            <p
              style={{
                margin: '0 0 4px',
                fontWeight: 600,
                fontSize: '14px',
                color: C.text,
              }}
            >
              Demo-Daten aktiv
            </p>
            <p style={{ margin: '0 0 12px', fontSize: '13px', color: C.muted }}>
              Die App startet mit Beispieldaten (April 2026), damit du alle
              Funktionen sofort ausprobieren kannst. Alle Einträge auf jeder
              Seite können über <strong>✏️ bearbeitet</strong> oder{' '}
              <strong>🗑️ gelöscht</strong> werden.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Btn
                v="secondary"
                size="sm"
                onClick={() => dispatch({ type: 'RESET_DEMO' })}
              >
                <RefreshCw size={13} />
                Demo-Daten zurücksetzen
              </Btn>
              <Btn
                v="danger"
                size="sm"
                onClick={() => dispatch({ type: 'RESET_EMPTY' })}
              >
                Alle Daten löschen
              </Btn>
            </div>
          </div>
        </div>
      </Card>

      {/* Active Month */}
      {mp && (
        <Card style={{ padding: '20px', marginBottom: '20px' }}>
          <h3
            style={{
              margin: '0 0 4px',
              fontSize: '15px',
              fontWeight: 600,
              color: C.text,
            }}
          >
            Aktiver Monat
          </h3>
          <p style={{ margin: '0 0 12px', fontSize: '13px', color: C.muted }}>
            {MONTH_NAMES[mp.month]} {mp.year} · läuft noch
          </p>
          <p style={{ margin: 0, fontSize: '13px', color: C.muted }}>
            Der Monat wird automatisch abgeschlossen, wenn du den letzten Tag
            (30. {MONTH_NAMES[mp.month]}) abschließt. Dabei öffnet sich ein
            Dialog für deine Monatsreflexion.
          </p>
        </Card>
      )}

      {/* New Month */}
      <Card style={{ padding: '20px', marginBottom: '20px' }}>
        <h3
          style={{
            margin: '0 0 16px',
            fontSize: '15px',
            fontWeight: 600,
            color: C.text,
          }}
        >
          Neuen Monat erstellen
        </h3>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '16px',
            flexWrap: 'wrap',
          }}
        >
          <Field label="Jahr">
            <input
              type="number"
              value={newM.year}
              onChange={(e) => setNewM({ ...newM, year: +e.target.value })}
              style={{ ...iStyle, width: '120px' }}
            />
          </Field>
          <Field label="Monat">
            <select
              value={newM.month}
              onChange={(e) => setNewM({ ...newM, month: +e.target.value })}
              style={{ ...iStyle, background: '#fff', width: '160px' }}
            >
              {MONTH_NAMES.slice(1).map((n, i) => (
                <option key={i + 1} value={i + 1}>
                  {n}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Btn
          onClick={() => {
            if (
              !state.monthPlans.some(
                (m) => m.year === newM.year && m.month === newM.month
              )
            )
              dispatch({
                type: 'CREATE_MONTH',
                p: {
                  year: newM.year,
                  month: newM.month,
                  month_name: MONTH_NAMES[newM.month],
                },
              });
          }}
        >
          <Plus size={14} />
          Monat erstellen
        </Btn>
      </Card>

      {/* Month List */}
      <Card style={{ padding: '20px' }}>
        <h3
          style={{
            margin: '0 0 16px',
            fontSize: '15px',
            fontWeight: 600,
            color: C.text,
          }}
        >
          Alle Monate
        </h3>
        {state.monthPlans.length === 0 ? (
          <p style={{ color: C.muted, fontSize: '14px', margin: 0 }}>
            Noch keine Monate erstellt.
          </p>
        ) : (
          state.monthPlans.map((m) => (
            <div
              key={m.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <div>
                <span
                  style={{ fontSize: '14px', fontWeight: 500, color: C.text }}
                >
                  {MONTH_NAMES[m.month]} {m.year}
                </span>
              </div>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Badge
                  color={
                    m.status === 'active'
                      ? 'green'
                      : m.status === 'completed'
                      ? 'blue'
                      : 'gray'
                  }
                >
                  {m.status === 'active'
                    ? 'Aktiv'
                    : m.status === 'completed'
                    ? 'Abgeschlossen'
                    : 'Archiviert'}
                </Badge>
                {m.status !== 'active' && (
                  <IconBtn
                    icon={Trash2}
                    onClick={() => dispatch({ type: 'DELETE_MONTH', id: m.id })}
                    color="#fca5a5"
                    title="Monat löschen"
                  />
                )}
              </div>
            </div>
          ))
        )}
      </Card>
    </div>
  );
}

// ─── APP ROOT ────────────────────────────────────────────────────────────────
export default function App() {
  const [state, dispatch] = useReducer(reducer, DEMO);
  const [page, setPage] = useState('dashboard');
  const [params, setParams] = useState({});
  const navigate = (p, ps = {}) => {
    setPage(p);
    setParams(ps);
  };
  const pages = {
    dashboard: <Dashboard />,
    dayview: <DayView date={params.date} />,
    habits: <Habits />,
    nogos: <NoGos />,
    todos: <Todos />,
    rewards: <Rewards />,
    planday: <PlanDay />,
    calendar: <MonthCalendar />,
    aktivitaeten: <Aktivitaeten />,
    archive: <ArchivePage />,
    settings: <SettingsPage />,
  };
  return (
    <Ctx.Provider value={{ state, dispatch, navigate, params }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');*{box-sizing:border-box;}body{margin:0;font-family:'Outfit',sans-serif;}::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:4px;}::-webkit-scrollbar-track{background:transparent;}`}</style>
      <div
        style={{
          display: 'flex',
          height: '100vh',
          overflow: 'hidden',
          fontFamily: "'Outfit',sans-serif",
          background: '#f8f7f3',
        }}
      >
        <Sidebar page={page} navigate={navigate} />
        <main style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
          {pages[page] || <Dashboard />}
        </main>
      </div>
    </Ctx.Provider>
  );
}
