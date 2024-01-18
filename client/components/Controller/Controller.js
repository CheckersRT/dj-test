"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Controller.module.css";
import io from "socket.io-client";
import setUpAudio from "@/utils/setUpAudio";
import { socketsOn, socketsOff } from "@/utils/socketsOnOff";
import { handlePlayPause } from "@/utils/Controls/handlePlayPause";
import handleControl from "@/utils/Controls/handleControl";
import handleCue from "@/utils/Controls/handleCue";
import Player from "../Player/Player";
import Mixer from "../Mixer/Mixer";

export const socket = io.connect("http://localhost:3001");

export default function Controller() {
  // STATES
  const [audioFile, setAudioFile] = useState("");
  const [audioUrlCh1, setAudioUrlCh1] = useState("");
  const [audioUrlCh2, setAudioUrlCh2] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const [playTime, setPlayTime] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // // REFS
  const playerCh1 = useRef();
  const playerCh2 = useRef();
  const playerMaster = useRef();
  const eqCh1 = useRef();
  const eqCh2 = useRef();
  const crossFader = useRef();
  const gainCh1 = useRef();
  const gainCh2 = useRef();
  const filterHpCh1 = useRef();
  const filterHpCh2 = useRef();
  const filterLpCh1 = useRef();
  const filterLpCh2 = useRef();
  const meterCh1 = useRef();
  const meterCh2 = useRef();
  const mixerArray = useRef();

  mixerArray.current = [];
  mixerArray.current.push(
    playerCh1,
    playerCh2,
    playerMaster,
    eqCh1,
    eqCh2,
    crossFader,
    gainCh1,
    gainCh2,
    filterHpCh1,
    filterHpCh2,
    filterLpCh1,
    filterLpCh2
  );

  // AUDIO NODE CHAIN SET UP
  useEffect(() => {
    setUpAudio(
      playerCh1,
      playerCh2,
      playerMaster,
      eqCh1,
      eqCh2,
      gainCh1,
      gainCh2,
      crossFader,
      audioUrlCh1,
      audioUrlCh2
    );
  }, [audioUrlCh1, audioUrlCh2]);

  // LISTEN FOR RECEIVED SOCKETS MESSAGES
  useEffect(() => {
    socketsOn(
      playerCh1,
      playerCh2,
      handleControl,
      handlePlayPause,
      mixerArray,
      setPlayTime,
      playTime,
      setTimeElapsed,
      timeElapsed
    );

    return () => {
      socketsOff();
    };
  }, [socket]);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <Player
          channel={1}
          audioFile={audioFile}
          setAudioFile={setAudioFile}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setAudioUrlCh1={setAudioUrlCh1}
          setAudioUrlCh2={setAudioUrlCh2}
          mixerArray={mixerArray}
          player={playerCh1}
          playTime={playTime}
          setPlayTime={setPlayTime}
          timeElapsed={timeElapsed}
          setTimeElapsed={setTimeElapsed}
        />
        <Mixer mixerArray={mixerArray}/>
        <Player
          channel={2}
          audioFile={audioFile}
          setAudioFile={setAudioFile}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setAudioUrlCh1={setAudioUrlCh1}
          setAudioUrlCh2={setAudioUrlCh2}
          mixerArray={mixerArray}
          player={playerCh2}
          playTime={playTime}
          setPlayTime={setPlayTime}
          timeElapsed={timeElapsed}
          setTimeElapsed={setTimeElapsed}
        />
      </div>
    </div>
  );
}
