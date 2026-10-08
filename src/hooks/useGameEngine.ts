import { useCallback, useMemo, useRef, useState } from 'react';
import { SCENARIOS } from '../data/scenarios';
import { getGuardianTitle, getVictimTitle, START_MONEY } from '../data/leaderboardData';
import type { Choice, Player, Scenario } from '../types';

export const START_HP = 100;

/** Trạng thái màn hình trong "cute phone" */
export type GamePhase = 'home' | 'ringing' | 'live' | 'debrief' | 'end';
export type Outcome = 'win' | 'lose' | null;

/** Hiệu ứng bay nổi trên màn hình (tiền bay 💸, nước mắt, tim) */
export type FxKind = 'money-loss' | 'money-gain' | 'tear' | 'heart' | 'sparkle';
export interface FxEvent {
  id: number;
  kind: FxKind;
  label?: string;
  /** vị trí phần trăm trong màn hình điện thoại */
  x: number;
  y: number;
}

export interface GameEngine {
  /* state */
  phase: GamePhase;
  scenario: Scenario | null;
  scenarioIndex: number;
  totalScenarios: number;
  balance: number;
  hp: number;
  trapsHit: number;
  dodges: number;
  bestStreak: number;
  lastChoice: Choice | null;
  outcome: Outcome;
  fx: FxEvent[];
  shakeKey: number;
  cryKey: number;
  averageReactionMs: number;
  reactionCount: number;
  /* derived */
  netLost: number;
  isFrozen: boolean;
  lowestMoment: boolean;
  me: Player;
  /* actions */
  startGame: () => void;
  acceptCall: () => void;
  declineCall: () => void;
  chooseOption: (choice: Choice) => void;
  nextScenario: () => void;
  restart: () => void;
  backHome: () => void;
}

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

/**
 * 🎮 useGameEngine — toàn bộ logic game: ví Heo Tiết Kiệm 🐷,
 * thanh máu Tâm Lý Thảnh Thơi 💖, số lần sập bẫy, phản xạ và hiệu ứng.
 */
export function useGameEngine(): GameEngine {
  const [phase, setPhase] = useState<GamePhase>('home');
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [balance, setBalance] = useState(START_MONEY);
  const [hp, setHp] = useState(START_HP);
  const [trapsHit, setTrapsHit] = useState(0);
  const [dodges, setDodges] = useState(0);
  /** Chuỗi né bẫy liên tiếp — dùng ref để không gọi setState lồng trong updater */
  const streakRef = useRef(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [lastChoice, setLastChoice] = useState<Choice | null>(null);
  const [outcome, setOutcome] = useState<Outcome>(null);
  const [fx, setFx] = useState<FxEvent[]>([]);
  const [shakeKey, setShakeKey] = useState(0);
  const [cryKey, setCryKey] = useState(0);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);

  const fxIdRef = useRef(0);
  const promptAtRef = useRef(0);

  const scenario: Scenario | null = SCENARIOS[scenarioIndex] ?? null;

  /* ---------------- FX helpers ---------------- */
  const pushFx = useCallback((kind: FxKind, label?: string) => {
    const id = (fxIdRef.current += 1);
    setFx((prev) => [...prev, { id, kind, label, x: randomBetween(16, 72), y: randomBetween(20, 42) }]);
    window.setTimeout(() => {
      setFx((prev) => prev.filter((item) => item.id !== id));
    }, 1700);
  }, []);

  const pushTears = useCallback(() => {
    for (let i = 0; i < 4; i += 1) pushFx('tear');
  }, [pushFx]);

  /* ---------------- Actions ---------------- */
  const startGame = useCallback(() => {
    setScenarioIndex(0);
    setLastChoice(null);
    setOutcome(null);
    setPhase(SCENARIOS[0].kind === 'call' ? 'ringing' : 'live');
    promptAtRef.current = Date.now();
  }, []);

  const acceptCall = useCallback(() => {
    setPhase('live');
    promptAtRef.current = Date.now();
  }, []);

  const chooseOption = useCallback(
    (choice: Choice) => {
      const reaction = promptAtRef.current ? Date.now() - promptAtRef.current : 0;
      setReactionTimes((prev) => [...prev, reaction]);
      setLastChoice(choice);

      setBalance((prev) => Math.max(0, prev + choice.moneyDelta));
      setHp((prev) => Math.max(0, Math.min(START_HP, prev + choice.hpDelta)));

      if (choice.isTrap) {
        setTrapsHit((prev) => prev + 1);
        streakRef.current = 0;
        setShakeKey((prev) => prev + 1);
        setCryKey((prev) => prev + 1);
        pushFx('money-loss', `💸 ${choice.moneyDelta.toLocaleString('vi-VN')}đ`);
        pushTears();
      } else {
        setDodges((prev) => prev + 1);
        streakRef.current += 1;
        setBestStreak((best) => Math.max(best, streakRef.current));
        if (choice.moneyDelta > 0) {
          pushFx('money-gain', `🎉 Ăn được ${choice.moneyDelta.toLocaleString('vi-VN')}đ`);
        } else {
          pushFx('sparkle', '✨ Né bẫy thành công!');
        }
        pushFx('heart');
      }

      setPhase('debrief');
    },
    [pushFx, pushTears],
  );

  /** Từ chối cuộc gọi = chọn luôn phương án an toàn của vụ án đó */
  const declineCall = useCallback(() => {
    if (!scenario) return;
    const safe = scenario.choices.find((choice) => !choice.isTrap) ?? scenario.choices[0];
    chooseOption(safe);
  }, [chooseOption, scenario]);

  const nextScenario = useCallback(() => {
    if (balance <= 0 || hp <= 0) {
      setOutcome('lose');
      setPhase('end');
      return;
    }
    const nextIndex = scenarioIndex + 1;
    if (nextIndex >= SCENARIOS.length) {
      setOutcome('win');
      setPhase('end');
      return;
    }
    setScenarioIndex(nextIndex);
    setLastChoice(null);
    setPhase(SCENARIOS[nextIndex].kind === 'call' ? 'ringing' : 'live');
    promptAtRef.current = Date.now();
  }, [balance, hp, scenarioIndex]);

  const restart = useCallback(() => {
    setScenarioIndex(0);
    setBalance(START_MONEY);
    setHp(START_HP);
    setTrapsHit(0);
    setDodges(0);
    streakRef.current = 0;
    setBestStreak(0);
    setLastChoice(null);
    setOutcome(null);
    setReactionTimes([]);
    setFx([]);
    setPhase(SCENARIOS[0].kind === 'call' ? 'ringing' : 'live');
    promptAtRef.current = Date.now();
  }, []);

  const backHome = useCallback(() => {
    setPhase('home');
  }, []);

  /* ---------------- Derived values ---------------- */
  const averageReactionMs = useMemo(() => {
    if (reactionTimes.length === 0) return 0;
    return Math.round(reactionTimes.reduce((sum, value) => sum + value, 0) / reactionTimes.length);
  }, [reactionTimes]);

  const netLost = Math.max(0, START_MONEY - balance);

  const me: Player = useMemo(
    () => ({
      id: 'you',
      name: 'HeoCon Của Bạn',
      avatar: '🐷',
      avatarBg: 'bg-peach/70',
      moneyLeft: balance,
      trapsHit,
      badge: trapsHit === 0 ? getGuardianTitle(trapsHit, balance) : getVictimTitle(trapsHit, balance),
      motto:
        trapsHit === 0
          ? 'Chưa sập bẫy nào, ví còn nguyên 💖'
          : `Đã trả "học phí" ${netLost.toLocaleString('vi-VN')}đ cho scammer 🥺`,
      reactionMs: averageReactionMs || 1500,
      isYou: true,
    }),
    [averageReactionMs, balance, netLost, trapsHit],
  );

  return {
    phase,
    scenario,
    scenarioIndex,
    totalScenarios: SCENARIOS.length,
    balance,
    hp,
    trapsHit,
    dodges,
    bestStreak,
    lastChoice,
    outcome,
    fx,
    shakeKey,
    cryKey,
    averageReactionMs,
    reactionCount: reactionTimes.length,
    netLost,
    isFrozen: balance <= 0 || hp <= 0,
    lowestMoment: balance <= 5_000_000 || hp <= 30,
    me,
    startGame,
    acceptCall,
    declineCall,
    chooseOption,
    nextScenario,
    restart,
    backHome,
  };
}
