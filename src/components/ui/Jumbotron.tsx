import type { ReactNode } from "react";

type JumbotronType = {
  idToAccess?: string;
  contentStrong?: ReactNode;
  title?: string;
  content?: string;
};

export default function Jumbotron({
  idToAccess,
  title,
  contentStrong,
  content,
}: JumbotronType) {
  return (
    <div id={idToAccess} className="w-full text-center p-4 flex flex-col gap-4">
      <h1 className="text-xl font-semibold text-[#ed6c18]">{title}</h1>
      <p className="text-sm text-[#444]">
        {contentStrong}
        {content}
      </p>
    </div>
  );
}
