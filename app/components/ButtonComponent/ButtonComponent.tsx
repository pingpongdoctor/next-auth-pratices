"use client";

interface ButtonComponentProps {
  btnContent: string;
  btnOnclickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ButtonComponent({
  btnContent,
  btnOnclickHandler,
}: ButtonComponentProps) {
  return <button onClick={btnOnclickHandler}>{btnContent}</button>;
}
