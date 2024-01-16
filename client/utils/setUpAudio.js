import { useRef } from "react";
import * as Tone from "tone/build/esm/";

export default function setUpAudio(
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
) {
  playerMaster.current = new Tone.Players({
    urls: {
    //   playerCh1: audioUrlCh1,
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

  //   meterCh1.current = new Tone.Meter();
  //   meterCh1.current.name = "meterCh1";
  //   meterCh2.current = new Tone.Meter();
  //   meterCh2.current.name = "meterCh1";

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
}
