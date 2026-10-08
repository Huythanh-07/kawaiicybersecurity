import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CutePhone from './components/CutePhone';
import StatusBar from './components/StatusBar';
import GameHUD from './components/GameHUD';
import HomeScreen from './components/HomeScreen';
import IncomingCallScreen from './components/IncomingCallScreen';
import CallScreen from './components/CallScreen';
import ChatScreen from './components/ChatScreen';
import DebriefCard from './components/DebriefCard';
import EndGameScreen from './components/EndGameScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import PhoneTabBar from './components/PhoneTabBar';
import SidePanel from './components/SidePanel';
import FxLayer from './components/FxLayer';
import { LiveFeedBubble } from './components/LiveFeedTicker';
import { useGameEngine } from './hooks/useGameEngine';
import { getGuardianTitle, getVictimTitle, LIVE_FEED_EVENTS } from './data/leaderboardData';
import type { AppTab } from './types';

const DECOR = [
  { emoji: '🌸', className: 'left-[6%] top-[16%]', delay: '0s' },
  { emoji: '🥕', className: 'left-[12%] top-[62%]', delay: '0.6s' },
  { emoji: '🍡', className: 'right-[8%] top-[22%]', delay: '1.1s' },
  { emoji: '🐰', className: 'right-[12%] top-[70%]', delay: '1.6s' },
  { emoji: '⭐', className: 'left-[3%] top-[38%]', delay: '0.3s' },
  { emoji: '💖', className: 'right-[4%] top-[46%]', delay: '0.9s' },
];

export default function App() {
  const game = useGameEngine();
  const [tab, setTab] = useState<AppTab>('game');

  const basePhase = game.phase === 'debrief' ? 'live' : game.phase;
  const isGameTab = tab === 'game';
  const screenKey = isGameTab ? `${basePhase}-${game.scenarioIndex}` : 'leaderboard';

  const island = useMemo(() => {
    if (!isGameTab) return { label: 'Bảng xếp hạng', emoji: '🏆', tone: 'neutral' as const };
    switch (game.phase) {
      case 'home':
        return { label: 'CyberGuard Kawaii 5.0', emoji: '🐰', tone: 'neutral' as const };
      case 'ringing':
        return { label: 'Cuộc gọi đến...', emoji: '📞', tone: 'danger' as const };
      case 'debrief':
        return { label: 'Thỏ Thám Tử đang giảng bài', emoji: '🔍', tone: 'safe' as const };
      case 'end':
        return game.outcome === 'win'
          ? { label: 'Hoàn thành nhiệm vụ!', emoji: '🎉', tone: 'safe' as const }
          : { label: 'Cháy túi rồi...', emoji: '🥺', tone: 'danger' as const };
      default:
        return {
          label: `Vụ án #${game.scenarioIndex + 1}`,
          emoji: '🛡️',
          tone: game.lowestMoment ? ('danger' as const) : ('neutral' as const),
        };
    }
  }, [game.lowestMoment, game.outcome, game.phase, game.scenarioIndex, isGameTab]);

  const endTitle =
    game.trapsHit === 0 ? getGuardianTitle(game.trapsHit, game.balance) : getVictimTitle(game.trapsHit, game.balance);

  const openLeaderboard = () => setTab('leaderboard');

  /** Render màn hình đang hoạt động theo tab + phase. */
  const renderScreen = () => {
    if (!isGameTab) return <LeaderboardScreen me={game.me} onSwitchToGame={() => setTab('game')} />;
    if (!game.scenario) return null;

    switch (basePhase) {
      case 'home':
        return <HomeScreen onStart={game.startGame} onOpenLeaderboard={openLeaderboard} />;
      case 'end':
        return (
          <EndGameScreen
            outcome={game.outcome}
            balance={game.balance}
            hp={game.hp}
            trapsHit={game.trapsHit}
            dodges={game.dodges}
            bestStreak={game.bestStreak}
            averageReactionMs={game.averageReactionMs}
            netLost={game.netLost}
            title={endTitle}
            onRestart={game.restart}
            onOpenLeaderboard={openLeaderboard}
          />
        );
      case 'ringing':
        return game.scenario.kind === 'call' ? (
          <IncomingCallScreen scenario={game.scenario} onAccept={game.acceptCall} onDecline={game.declineCall} />
        ) : null;
      default:
        return game.scenario.kind === 'call' ? (
          <CallScreen scenario={game.scenario} onSelect={game.chooseOption} />
        ) : (
          <ChatScreen scenario={game.scenario} onSelect={game.chooseOption} />
        );
    }
  };

  return (
    <div className="cs-page relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-4 py-6">
      {/* ✨ Trang trí nền */}
      {DECOR.map((item) => (
        <span
          key={item.emoji + item.className}
          className={`cs-bob pointer-events-none absolute hidden select-none text-3xl opacity-60 lg:block ${item.className}`}
          style={{ animationDelay: item.delay }}
        >
          {item.emoji}
        </span>
      ))}

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center justify-center gap-5 lg:flex-row">
        <SidePanel className="hidden lg:block" onOpenLeaderboard={openLeaderboard} />

        <div className="flex flex-col items-center gap-3">
          <div className="text-center lg:hidden">
            <h1 className="font-cute text-[18px] font-extrabold text-ink">
              CyberScam: Sinh Tồn Không Gian Mạng 🌸
            </h1>
            <p className="text-[10.5px] font-bold text-ink-soft">
              Phiên bản Kawaii • chống lừa đảo cùng Thỏ Thám Tử 🐰
            </p>
          </div>

          <CutePhone className="h-[min(760px,86dvh)] w-[min(380px,94vw)]">
            <StatusBar islandLabel={island.label} islandEmoji={island.emoji} tone={island.tone} />

            <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
              {isGameTab && game.phase !== 'home' && (
                <GameHUD
                  balance={game.balance}
                  hp={game.hp}
                  scenarioIndex={game.scenarioIndex}
                  totalScenarios={game.totalScenarios}
                  trapsHit={game.trapsHit}
                  shakeKey={game.shakeKey}
                />
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={screenKey}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.22 }}
                  className="relative flex min-h-0 flex-1 flex-col overflow-hidden"
                >
                  {renderScreen()}
                </motion.div>
              </AnimatePresence>

              {isGameTab && <FxLayer fx={game.fx} />}

              {isGameTab && game.phase === 'live' && <LiveFeedBubble events={LIVE_FEED_EVENTS} />}

              {isGameTab && game.phase === 'debrief' && game.lastChoice && game.scenario && (
                <DebriefCard
                  choice={game.lastChoice}
                  scenarioTitle={game.scenario.title}
                  isLastScenario={game.scenarioIndex === game.totalScenarios - 1}
                  onNext={game.nextScenario}
                />
              )}
            </div>

            <PhoneTabBar tab={tab} onChange={setTab} hasActiveRun={game.phase !== 'home'} />
          </CutePhone>
        </div>
      </div>
    </div>
  );
}
