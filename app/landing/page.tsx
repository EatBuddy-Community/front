import Content from "./Content.server";
import Footer from "./footer.server";
import Headers from "./Header.server";

export default function Landing() {
  return (
    <div>
      <Headers />
      <Content></Content>
      <Footer></Footer>
    </div>
  );
}
