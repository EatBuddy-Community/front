import Content from "./Content.server";
import Headers from "./Header.server";

export default function Landing() {
  return (
    <div>
      <Headers />
      <Content></Content>
    </div>
  );
}
