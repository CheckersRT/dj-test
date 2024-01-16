import { useRef } from "react";

export function setUpAudio(urlCh1, urlCh2) {
    const playerCh1 = useRef();
    const playerCh2 = useRef();
    const playerMaster = useRef();
    const eqCh1 = useRef();
    const eqCh2 = useRef();
    const crossFader = useRef();
    const gainCh1 = useRef();
    const gainCh2 = useRef();
    // const filterHpCh1 = useRef();
    // const filterHpCh2 = useRef();
    // const filterLpCh1 = useRef();
    // const filterLpCh2 = useRef();
    const meterCh1 = useRef();
    const meterCh2 = useRef();
    const mixerArray = useRef();

      // REFS

  playerMaster.current = new Tone.Players({
    urls: {
      // playerCh1: urlCh1,
      playerCh1: "/Prevail.wav",
      // playerCh2: urlCh2,
      playerCh2: "/DamnFineDay.wav",
    },
    onload: () => {
      console.log("loaded");
    },
  });

  playerCh1.current = playerMaster.current.player("playerCh1");
  playerCh1.current.name = "playerCh1";
  playerCh2.current = playerMaster.current.player("playerCh2");
  playerCh2.current.name = "playerCh2";

  gainCh1.current = new Tone.Gain();
  gainCh1.current.name = "gainCh1";
  gainCh2.current = new Tone.Gain();
  gainCh2.current.name = "gainCh2";
  console.log(gainCh1.current);

  eqCh1.current = new Tone.EQ3();
  eqCh1.current.name = "eqCh1";
  eqCh2.current = new Tone.EQ3();
  eqCh2.current.name = "eqCh2";

  // filterHpCh1.current = new Tone.Filter();
  // filterHpCh1.current.name = "filterHpCh1";
  // filterHpCh2.current = new Tone.Filter();
  // filterHpCh2.current.name = "filterHpCh2";
  // console.log(filterHpCh1);

  // filterLpCh1.current = new Tone.Filter();
  // filterLpCh1.current.name = "filterLpCh1";
  // filterLpCh2.current = new Tone.Filter();
  // filterLpCh2.current.name = "filterLpCh2";
  // console.log(filterLpCh1);

  meterCh1.current = new Tone.Meter();
  meterCh1.current.name = "meterCh1";
  meterCh2.current = new Tone.Meter();
  meterCh2.current.name = "meterCh1";

  crossFader.current = new Tone.CrossFade();
  crossFader.current.name = "crossFaderChAll";
  crossFader.current.toDestination();

  playerCh1.current.chain(
    gainCh1.current,
    eqCh1.current,
    // filterHpCh1.current,
    // filterLpCh1.current,
    crossFader.current.a
  );
  playerCh2.current.chain(
    gainCh2.current,
    eqCh2.current,
    // filterHpCh2.current,
    // filterLpCh2.current,
    crossFader.current.b
  );

  mixerArray.current = [];
  mixerArray.current.push(
    playerCh1.current,
    playerCh2.current,
    gainCh1.current,
    gainCh2.current,
    eqCh1.current,
    eqCh2.current,
    // filterHpCh1.current,
    // filterLpCh1.current,
    // filterHpCh2.current,
    // filterLpCh2.current,
    crossFader.current
  );


}
export {playerCh1, playerCh2, playerMaster, crossFader, mixerArray}
