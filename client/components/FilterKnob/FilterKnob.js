export default function FilterKnob({ channel, mixerArray }) {
  return (
    <>
      <label htmlFor={`ch${channel}-filter-frequency`}>Filter</label>
        <input
          name={`ch${channel}-filter-frequency`}
          id={`ch${channel}-filter-frequency`}
          type="range"
          min={40}
          max={5000}
          onChange={(event) => handleControl(event.target, "send", mixerArray)}
          />
    </>
  );
}
