import { Button } from "@material-tailwind/react";
import { Button as Button2 } from "./components/ui/button";
export function ButtonDefault() {
  return <Button>Button</Button>;
}

export default function App() {
  return (
    <>
      <ButtonDefault />
      <Button2>Button</Button2>
    </>
  );
}
