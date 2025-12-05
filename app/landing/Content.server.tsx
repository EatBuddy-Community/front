import Tags from "../componets/DraftTag/Tags";
import ToggleSwitchButton from "../componets/ToggleSwitch.tsx/ToggleSwitchButton";

export default function Content() {
  return (
    <div>
      <div className="flex justify-center">
        <input
          className="border-2 min-w-108 h-10 pl-4 rounded-2xl"
          type="search"
        ></input>
        <ToggleSwitchButton />
      </div>
      <div className="flex justify-center gap-3">
        <Tags label="전체" />
        <Tags label="치킨" />
        <Tags label="족발" />
        <Tags label="족발" />
        <Tags label="족발" />
        <Tags label="족발" />
      </div>
    </div>
  );
}
