import { Metadata } from "next";
import FormComponent from "./components/FormComponent";

export const metadata: Metadata = {
  title: "Login Page",
};

export default function LoginPage() {
  return (
    <div>
      <FormComponent />
    </div>
  );
}
