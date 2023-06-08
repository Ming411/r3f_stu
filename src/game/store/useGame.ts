import {create} from 'zustand';
import {subscribeWithSelector} from 'zustand/middleware';

type GameState = {
  blocksCount: number;
  blocksSeed: number;
  startTime: number;
  endTime: number;
  phase: 'ready' | 'playing' | 'ended';
  start: () => void;
  restart: () => void;
  end: () => void;
};

export const useGame = create(
  // subscribeWithSelector 用于监听状态变化
  subscribeWithSelector<GameState>(set => ({
    blocksCount: 5, // 板块个数
    blocksSeed: 0, // 用于每次重玩时，重新生成板块

    startTime: 0,
    endTime: 0,
    phase: 'ready', // 游戏状态

    start: () => {
      set(state => (state.phase === 'ready' ? {phase: 'playing', startTime: Date.now()} : {}));
    },
    restart: () => {
      set(state =>
        state.phase === 'playing' || state.phase === 'ended'
          ? {phase: 'ready', blocksSeed: Math.random()}
          : {}
      );
    },
    end: () => {
      set(state => (state.phase === 'playing' ? {phase: 'ended', endTime: Date.now()} : {}));
    }
  }))
);
